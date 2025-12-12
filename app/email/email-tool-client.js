'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './email.module.css';
import { downloadQRCode } from '../utils/qr-downloader';

const availableBackgrounds = Array.from(
    { length: 1 },
    (_, i) => `/backgrounds/qr-code/email${i + 1}.png`
);

export default function EmailToolClient() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [log, setLog] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const [isQrEditorExpanded, setIsQrEditorExpanded] = useState(false);
    const [qrFgColor, setQrFgColor] = useState('#000000');
    const [qrBgColor, setQrBgColor] = useState('#ffffff');
    const [qrLogo, setQrLogo] = useState(null);
    const [qrLogoSize, setQrLogoSize] = useState(40);
    const [stylishBg, setStylishBg] = useState(null);
    const [stylishText, setStylishText] = useState('Scan to Email');
    const [stylishTextColor, setStylishTextColor] = useState('#000000');
    const qrCodeRef = useRef(null);

    // Load state from localStorage on component mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('emailToolData');
            if (savedData) {
                const data = JSON.parse(savedData);
                setEmail(data.email || '');
                setSubject(data.subject || '');
                setBody(data.body || '');
                setQrFgColor(data.qrFgColor || '#000000');
                setQrBgColor(data.qrBgColor || '#ffffff');
                setQrLogo(data.qrLogo || null);
                setQrLogoSize(data.qrLogoSize || 40);
                setStylishText(data.stylishText || 'Scan to Email');
                setStylishTextColor(data.stylishTextColor || '#000000');
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    // Save state to localStorage on change
    useEffect(() => {
        try {
            const dataToSave = {
                email, subject, body,
                qrFgColor, qrBgColor, qrLogo, qrLogoSize,
                stylishText, stylishTextColor
            };
            localStorage.setItem('emailToolData', JSON.stringify(dataToSave));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [email, subject, body, qrFgColor, qrBgColor, qrLogo, qrLogoSize, stylishText, stylishTextColor]);

    const addToLog = useCallback((message, type = 'info') => {
        const formattedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        setLog(prev => [`<span class="${styles[type]}">[${new Date().toLocaleTimeString()}] ${formattedMessage}</span>`, ...prev]);
    }, []);

    const emailUrl = useMemo(() => {
        if (!email) return '';
        let url = `mailto:${email}`;
        const params = [];
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
        return url;
    }, [email, subject, body]);

    const handleWriteNfc = async () => {
        if (!emailUrl) {
            addToLog('Please fill in the Email Address first.', 'error');
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
                records: [{ recordType: "url", data: emailUrl }]
            });

            addToLog(`✅ Successfully wrote Email link to NFC tag!`, 'success');
            addToLog(`URL Written: ${emailUrl}`, 'info');

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

    const handleDownloadQR = (isStylish = false) => {
        const base = email || 'email';
        const filename = isStylish ? `${base}_stylish_webnfc.org_qr.png` : `${base}_webnfc.org_qr.png`;
        downloadQRCode({
            qrCodeRef,
            filename,
            isStylish,
            qrBgColor,
            stylishText,
            stylishTextColor,
            stylishBg,
            addToLog
        });
    };

    const handleCopyLink = () => {
        if (!emailUrl) return;
        navigator.clipboard.writeText(emailUrl).then(() => {
            addToLog('✅ Email link copied to clipboard!', 'success');
        }, () => {
            addToLog('Failed to copy Email link.', 'error');
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
                <h1>Email QR & NFC Writer</h1>
                <p>Generate an Email QR code and write it to an NFC tag.</p>
            </div>

            <div className={styles.toolLayout}>
                {/* Input Form */}
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email Address *</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-required="true"
                            placeholder="recipient@example.com"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="subject">Subject (Optional)</label>
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Hello"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="body">Body (Optional)</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Type your message here..."
                            rows={4}
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
                                <input id="stylishText" type="text" value={stylishText} onChange={(e) => setStylishText(e.target.value)} placeholder="e.g., Scan to Email" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="stylishTextColor">Text Color</label>
                                <input id="stylishTextColor" type="color" value={stylishTextColor} onChange={(e) => setStylishTextColor(e.target.value)} className={styles.colorInput} />
                            </div>
                            <button onClick={() => handleDownloadQR(true)} disabled={!emailUrl} className={styles.stylishDownloadButton}>
                                Download Stylish QR
                            </button>

                        </div>
                    )}
                </div>

                {/* QR Code and Actions */}
                <div className={styles.output}>
                    <div className={styles.qrContainer} ref={qrCodeRef}>
                        {emailUrl ? (
                            <QRCodeCanvas
                                value={emailUrl}
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
                            disabled={isWriting || !emailUrl}
                            className={styles.actionButton}
                        >
                            {isWriting ? 'Writing...' : 'Write to NFC Tag'}
                        </button>
                        <button
                            onClick={() => handleDownloadQR(false)}
                            disabled={!emailUrl}
                            className={styles.downloadButton}
                        >
                            Download QR
                        </button>
                        <button
                            onClick={handleCopyLink}
                            disabled={!emailUrl}
                            className={styles.copyButton}
                        >
                            Copy Email Link
                        </button>
                        <button
                            onClick={() => window.open(emailUrl, '_self')}
                            disabled={!emailUrl}
                            className={styles.copyButton}
                        >
                            Open Email Link
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