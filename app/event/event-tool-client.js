'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './event.module.css';
import { downloadQRCode } from '../utils/qr-downloader';

const availableBackgrounds = Array.from(
    { length: 1 },
    (_, i) => `/backgrounds/qr-code/event${i + 1}.png`
);

export default function EventToolClient() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [log, setLog] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const [isQrEditorExpanded, setIsQrEditorExpanded] = useState(false);
    const [qrFgColor, setQrFgColor] = useState('#000000');
    const [qrBgColor, setQrBgColor] = useState('#ffffff');
    const [qrLogo, setQrLogo] = useState(null);
    const [qrLogoSize, setQrLogoSize] = useState(40);
    const [stylishBg, setStylishBg] = useState(null);
    const [stylishText, setStylishText] = useState('Scan to Save Event');
    const [stylishTextColor, setStylishTextColor] = useState('#000000');
    const qrCodeRef = useRef(null);

    // Load state from localStorage on component mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('eventToolData');
            if (savedData) {
                const data = JSON.parse(savedData);
                setTitle(data.title || '');
                setStartDate(data.startDate || '');
                setEndDate(data.endDate || '');
                setLocation(data.location || '');
                setDescription(data.description || '');
                setQrFgColor(data.qrFgColor || '#000000');
                setQrBgColor(data.qrBgColor || '#ffffff');
                setQrLogo(data.qrLogo || null);
                setQrLogoSize(data.qrLogoSize || 40);
                setStylishText(data.stylishText || 'Scan to Save Event');
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
                title, startDate, endDate, location, description,
                qrFgColor, qrBgColor, qrLogo, qrLogoSize,
                stylishText, stylishTextColor
            };
            localStorage.setItem('eventToolData', JSON.stringify(dataToSave));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [title, startDate, endDate, location, description, qrFgColor, qrBgColor, qrLogo, qrLogoSize, stylishText, stylishTextColor]);

    const addToLog = useCallback((message, type = 'info') => {
        const formattedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        setLog(prev => [`<span class="${styles[type]}">[${new Date().toLocaleTimeString()}] ${formattedMessage}</span>`, ...prev]);
    }, []);

    const formatToICalDate = (dateStr) => {
        if (!dateStr) return '';
        // Remove dashes and colons, append 00 for seconds if needed
        return dateStr.replace(/[-:]/g, '') + '00';
    };

    const eventData = useMemo(() => {
        if (!title || !startDate || !endDate) return '';
        const start = formatToICalDate(startDate);
        const end = formatToICalDate(endDate);

        // Basic vCalendar 2.0 format
        return `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
SUMMARY:${title}\r
DTSTART:${start}\r
DTEND:${end}\r
LOCATION:${location || ''}\r
DESCRIPTION:${description || ''}\r
END:VEVENT\r
END:VCALENDAR`;
    }, [title, startDate, endDate, location, description]);

    const handleWriteNfc = async () => {
        if (!eventData) {
            addToLog('Please fill in the Event Title, Start Date, and End Date.', 'error');
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

            // Writing as text/vcalendar or plain text usually works for Android to recognize it
            await ndef.write({
                records: [{ recordType: "mime", mediaType: "text/x-vcalendar", data: eventData }]
            });

            addToLog(`✅ Successfully wrote Event to NFC tag!`, 'success');
            addToLog(`Event Written: ${title}`, 'info');

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
        const base = `event_${title.replace(/\s+/g, '_')}_webnfc.org_qr.png`;
        const filename = isStylish ? `stylish_${base}` : base;
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
        if (!eventData) return;
        navigator.clipboard.writeText(eventData).then(() => {
            addToLog('✅ Event data copied to clipboard!', 'success');
        }, () => {
            addToLog('Failed to copy Event data.', 'error');
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
                <h1>Event QR & NFC Writer</h1>
                <p>Generate an Event QR code and write it to an NFC tag.</p>
            </div>

            <div className={styles.toolLayout}>
                {/* Input Form */}
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Event Title *</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            aria-required="true"
                            placeholder="Birthday Party"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="startDate">Start Date & Time *</label>
                        <input
                            id="startDate"
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="endDate">End Date & Time *</label>
                        <input
                            id="endDate"
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="location">Location (Optional)</label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="123 Main St, City"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Details about the event..."
                            rows={3}
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
                                <input id="stylishText" type="text" value={stylishText} onChange={(e) => setStylishText(e.target.value)} placeholder="e.g., Scan to Save Event" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="stylishTextColor">Text Color</label>
                                <input id="stylishTextColor" type="color" value={stylishTextColor} onChange={(e) => setStylishTextColor(e.target.value)} className={styles.colorInput} />
                            </div>
                            <button onClick={() => handleDownloadQR(true)} disabled={!eventData} className={styles.stylishDownloadButton}>
                                Download Stylish QR
                            </button>

                        </div>
                    )}
                </div>

                {/* QR Code and Actions */}
                <div className={styles.output}>
                    <div className={styles.qrContainer} ref={qrCodeRef}>
                        {eventData ? (
                            <QRCodeCanvas
                                value={eventData}
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
                            disabled={isWriting || !eventData}
                            className={styles.actionButton}
                        >
                            {isWriting ? 'Writing...' : 'Write to NFC Tag'}
                        </button>
                        <button
                            onClick={() => handleDownloadQR(false)}
                            disabled={!eventData}
                            className={styles.downloadButton}
                        >
                            Download QR
                        </button>
                        <button
                            onClick={handleCopyLink}
                            disabled={!eventData}
                            className={styles.copyButton}
                        >
                            Copy Event Data
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