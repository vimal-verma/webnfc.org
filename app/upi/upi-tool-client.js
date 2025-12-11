'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './upi.module.css';

const availableBackgrounds = Array.from(
    { length: 4 },
    (_, i) => `/backgrounds/qr-code/${i + 1}.png`
);

export default function UpiToolClient() {
    const [upiId, setUpiId] = useState('');
    const [payeeName, setPayeeName] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [log, setLog] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const [isQrEditorExpanded, setIsQrEditorExpanded] = useState(false);
    const [qrFgColor, setQrFgColor] = useState('#000000');
    const [qrBgColor, setQrBgColor] = useState('#ffffff');
    const [qrLogo, setQrLogo] = useState(null);
    const [qrLogoSize, setQrLogoSize] = useState(40);
    const [stylishBg, setStylishBg] = useState(null);
    const [stylishText, setStylishText] = useState('Scan to Pay');
    const [stylishTextColor, setStylishTextColor] = useState('#000000');
    const qrCodeRef = useRef(null);

    // Load state from localStorage on component mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('upiToolData');
            if (savedData) {
                const data = JSON.parse(savedData);
                setUpiId(data.upiId || '');
                setPayeeName(data.payeeName || '');
                setAmount(data.amount || '');
                setNote(data.note || '');
                setQrFgColor(data.qrFgColor || '#000000');
                setQrBgColor(data.qrBgColor || '#ffffff');
                setQrLogo(data.qrLogo || null);
                setQrLogoSize(data.qrLogoSize || 40);
                setStylishText(data.stylishText || 'Scan to Pay');
                setStylishTextColor(data.stylishTextColor || '#000000');
                // Not loading stylishBg from localStorage to avoid storing large data URLs unnecessarily on every change.
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    // Save state to localStorage on change
    useEffect(() => {
        try {
            const dataToSave = {
                upiId, payeeName, amount, note,
                qrFgColor, qrBgColor, qrLogo, qrLogoSize,
                stylishText, stylishTextColor
            };
            localStorage.setItem('upiToolData', JSON.stringify(dataToSave));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [upiId, payeeName, amount, note, qrFgColor, qrBgColor, qrLogo, qrLogoSize, stylishText, stylishTextColor]);

    const addToLog = useCallback((message, type = 'info') => {
        const formattedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        setLog(prev => [`<span class="${styles[type]}">[${new Date().toLocaleTimeString()}] ${formattedMessage}</span>`, ...prev]);
    }, []);

    const upiUrl = useMemo(() => {
        if (!upiId || !payeeName) return '';
        const url = new URL('upi://pay');
        url.searchParams.set('pa', upiId); // Payee VPA (Virtual Payment Address)
        url.searchParams.set('pn', payeeName); // Payee Name
        if (amount) url.searchParams.set('am', amount); // Amount
        if (note) url.searchParams.set('tn', note); // Transaction Note
        url.searchParams.set('cu', 'INR'); // Currency
        return url.toString();
    }, [upiId, payeeName, amount, note]);

    const handleWriteNfc = async () => {
        if (!upiUrl) {
            addToLog('Please fill in UPI ID and Payee Name first.', 'error');
            return;
        }

        if (!('NDEFReader' in window)) {
            addToLog('Web NFC is not supported on this browser. Please use Chrome on Android.', 'error');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            setIsWriting(true);
            addToLog('Scan started. Bring a tag close to your device to write.', 'info');

            await ndef.write({
                records: [{ recordType: "url", data: upiUrl }]
            });

            addToLog(`✅ Successfully wrote UPI link to NFC tag!`, 'success');
            addToLog(`URL Written: ${upiUrl}`, 'info');

        } catch (error) {
            if (error.name === 'NotAllowedError') {
                addToLog('Write operation cancelled by user.', 'error');
            } else {
                addToLog(`Error: ${error.message}`, 'error');
            }
        } finally {
            setIsWriting(false);
        }
    };


    const triggerDownload = (url, filename) => {
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleDownloadQR = (isStylish = false) => {
        const qrCanvas = qrCodeRef.current?.querySelector('canvas');
        if (!qrCanvas) {
            addToLog('QR Code not generated yet. Please fill in the required fields.', 'error');
            return;
        }

        if (!isStylish) {
            // Simple QR code download
            const pngUrl = qrCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            triggerDownload(pngUrl, `${payeeName.replace(/\s+/g, '_') || 'upi'}_webnfc.org_qr.png`);
            addToLog('✅ QR Code downloaded.', 'success');
            return;
        }

        // Stylish QR code download
        const downloadCanvas = document.createElement('canvas');
        const ctx = downloadCanvas.getContext('2d');
        const width = 1080; // Standard portrait width
        const height = 1920; // 9:16 aspect ratio
        downloadCanvas.width = width;
        downloadCanvas.height = height;

        const drawContentAndDownload = (bgImage = null) => {
            if (bgImage) {
                ctx.drawImage(bgImage, 0, 0, width, height);
            } else {
                ctx.fillStyle = qrBgColor;
                ctx.fillRect(0, 0, width, height);
            }

            // Position the QR code and text
            const qrSize = width * 0.9; // QR code takes 90% of width
            const qrX = (width - qrSize) / 2;
            const qrY = height * 0.2; // Position it 20% from the top
            ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

            if (stylishText) {
                ctx.fillStyle = stylishTextColor;
                ctx.font = `bold ${width * 0.06}px Arial`;
                ctx.textAlign = 'center';
                const textY = qrY - 80; // Place text above the QR code
                ctx.fillText(stylishText, width / 2, textY);
            }

            const pngUrl = downloadCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            triggerDownload(pngUrl, `${payeeName.replace(/\s+/g, '_') || 'upi'}_stylish_webnfc.org_qr.png`);
            addToLog('✅ Stylish QR Code downloaded.', 'success');
        };

        if (stylishBg) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => drawContentAndDownload(img);
            img.onerror = () => {
                addToLog('Failed to load background image. Downloading without it.', 'error');
                drawContentAndDownload(null);
            };
            img.src = stylishBg;
        } else {
            drawContentAndDownload(null);
        }
    };

    const handleCopyLink = () => {
        if (!upiUrl) return;
        navigator.clipboard.writeText(upiUrl).then(() => {
            addToLog('✅ UPI link copied to clipboard!', 'success');
        }, () => {
            addToLog('Failed to copy UPI link.', 'error');
        });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrLogo(reader.result);
                addToLog('✅ Logo added to QR code.', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setQrLogo(null);
        const fileInput = document.getElementById('qr-logo-input');
        if (fileInput) fileInput.value = '';
        addToLog('Logo removed from QR code.', 'info');
    };

    const handleStylishBgUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStylishBg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStylishBgSelect = (bgUrl) => {
        setStylishBg(bgUrl);
        addToLog('✅ Background image selected from gallery.', 'success');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>UPI QR & NFC Writer</h1>
                <p>Generate a UPI payment QR code and write it to an NFC tag.</p>
            </div>

            <div className={styles.toolLayout}>
                {/* Input Form */}
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="upiId">UPI ID (VPA) *</label>
                        <input
                            id="upiId"
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            aria-required="true"
                            placeholder="yourname@bank"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="payeeName">Payee Name *</label>
                        <input
                            id="payeeName"
                            type="text"
                            value={payeeName}
                            onChange={(e) => setPayeeName(e.target.value)}
                            aria-required="true"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="amount">Amount (Optional)</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="10.00"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="note">Transaction Note (Optional)</label>
                        <input
                            id="note"
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Payment for coffee"
                        />
                    </div>

                    <button
                        onClick={() => setIsQrEditorExpanded(!isQrEditorExpanded)}
                        className={styles.expanderButton}
                        aria-expanded={isQrEditorExpanded}
                        aria-controls="qr-editor-section"
                    >
                        Advanced QR Editor {isQrEditorExpanded ? '▲' : '▼'}
                    </button>

                    {isQrEditorExpanded && (
                        <div id="qr-editor-section" className={styles.qrEditor} aria-describedby="qr-editor-note">
                            <div className={styles.editorRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="qrFgColor">QR Color</label>
                                    <input id="qrFgColor" type="color" value={qrFgColor} onChange={(e) => setQrFgColor(e.target.value)} className={styles.colorInput} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="qrBgColor">Background Color</label>
                                    <input id="qrBgColor" type="color" value={qrBgColor} onChange={(e) => setQrBgColor(e.target.value)} className={styles.colorInput} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="qr-logo-input">Add Logo</label>
                                <input id="qr-logo-input" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className={styles.fileInput} />
                                {qrLogo && (
                                    <button onClick={removeLogo} className={styles.removeLogoButton}>Remove Logo</button>
                                )}
                            </div>
                            {qrLogo && (
                                <div className={styles.inputGroup}>
                                    <label htmlFor="qrLogoSize">Logo Size: {qrLogoSize}px</label>
                                    <input
                                        id="qrLogoSize"
                                        type="range"
                                        min="20"
                                        max="80"
                                        value={qrLogoSize}
                                        onChange={(e) => setQrLogoSize(Number(e.target.value))}
                                        className={styles.sliderInput}
                                    />
                                </div>
                            )}
                            <p id="qr-editor-note" className={styles.editorNote}>
                                Note: Adding a logo or using complex colors may reduce QR code scannability. Always test before printing.
                            </p>

                            <hr className={styles.divider} />

                            <h4 className={styles.editorSubheading}>Stylish Download Options</h4>
                            <div className={styles.inputGroup}>
                                <label>Or Select from Gallery</label>
                                <div className={styles.backgroundSelector}>
                                    {availableBackgrounds.map((bg) => (
                                        <button
                                            key={bg}
                                            className={`${styles.backgroundPreview} ${stylishBg === bg ? styles.backgroundSelected : ''}`}
                                            onClick={() => handleStylishBgSelect(bg)}
                                            style={{ backgroundImage: `url(${bg})` }}
                                            aria-label={`Select background ${bg.split('/').pop().split('.')[0]}`}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="stylish-bg-input">Or Upload Background</label>
                                <input id="stylish-bg-input" type="file" accept="image/png, image/jpeg" onChange={handleStylishBgUpload} className={styles.fileInput} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="stylishText">Display Text</label>
                                <input id="stylishText" type="text" value={stylishText} onChange={(e) => setStylishText(e.target.value)} placeholder="e.g., Scan to Pay" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="stylishTextColor">Text Color</label>
                                <input id="stylishTextColor" type="color" value={stylishTextColor} onChange={(e) => setStylishTextColor(e.target.value)} className={styles.colorInput} />
                            </div>
                            <button onClick={() => handleDownloadQR(true)} disabled={!upiUrl} className={styles.stylishDownloadButton}>
                                Download Stylish QR
                            </button>

                        </div>
                    )}
                </div>

                {/* QR Code and Actions */}
                <div className={styles.output}>
                    <div className={styles.qrContainer} ref={qrCodeRef}>
                        {upiUrl ? (
                            <QRCodeCanvas
                                value={upiUrl}
                                size={256}
                                includeMargin={true}
                                level="H" // High error correction for logo
                                bgColor={qrBgColor}
                                fgColor={qrFgColor}
                                imageSettings={qrLogo ? {
                                    src: qrLogo,
                                    height: qrLogoSize,
                                    width: qrLogoSize,
                                    excavate: true,
                                } : undefined}
                            />
                        ) : (
                            <div className={styles.qrPlaceholder}>
                                <p>Fill in required fields to generate QR Code</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            onClick={handleWriteNfc}
                            disabled={isWriting || !upiUrl}
                            className={styles.actionButton}
                        >
                            {isWriting ? 'Writing...' : 'Write to NFC Tag'}
                        </button>
                        <button
                            onClick={() => handleDownloadQR(false)}
                            disabled={!upiUrl}
                            className={styles.downloadButton}
                        >
                            Download QR
                        </button>
                        <button
                            onClick={handleCopyLink}
                            disabled={!upiUrl}
                            className={styles.copyButton}
                        >
                            Copy UPI Link
                        </button>
                        <button
                            onClick={() => window.open(upiUrl, '_blank')}
                            disabled={!upiUrl}
                            className={styles.copyButton}
                        >
                            Open UPI Link
                        </button>
                    </div>
                </div>
            </div>

            {/* Log Output */}
            <div className={styles.logContainer}>
                <p className={styles.privacyNote}>
                    🔒 All information is stored locally in your browser. Nothing is shared with our servers. Always verify generated QR codes and links before sharing.
                </p>
                <div className={styles.logHeader}>
                    <h3>Log</h3>
                    <button onClick={() => setLog([])} className={styles.clearLogButton} disabled={log.length === 0}>
                        Clear
                    </button>
                </div>
                <div className={styles.log} dangerouslySetInnerHTML={{ __html: log.join('<br />') }} aria-live="polite" />
            </div>
        </div>
    );
}