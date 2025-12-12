'use client';

import styles from './AdvancedQrEditor.module.css';

export default function AdvancedQrEditor({
    isExpanded,
    setIsExpanded,
    qrFgColor, setQrFgColor,
    qrBgColor, setQrBgColor,
    qrLogo, setQrLogo,
    qrLogoSize, setQrLogoSize,
    stylishBg, setStylishBg,
    stylishText, setStylishText,
    stylishTextColor, setStylishTextColor,
    availableBackgrounds = [],
    defaultStylishText = 'Scan to Save',
    onDownloadStylish,
    downloadDisabled,
    addToLog
}) {
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrLogo(reader.result);
                if (addToLog) addToLog('✅ Logo added to QR code.', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setQrLogo(null);
        const fileInput = document.getElementById('qr-logo-input');
        if (fileInput) fileInput.value = '';
        if (addToLog) addToLog('Logo removed from QR code.', 'info');
    };

    const handleStylishBgUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStylishBg(reader.result);
                if (addToLog) addToLog('✅ Background image uploaded.', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStylishBgSelect = (bgUrl) => {
        setStylishBg(bgUrl);
        if (addToLog) addToLog('✅ Background image selected from gallery.', 'success');
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all QR customizations to default?')) {
            setQrFgColor('#000000');
            setQrBgColor('#ffffff');
            setQrLogo(null);
            setQrLogoSize(40);
            setStylishBg(null);
            setStylishText(defaultStylishText);
            setStylishTextColor('#000000');
            const fileInput = document.getElementById('qr-logo-input');
            if (fileInput) fileInput.value = '';
            if (addToLog) addToLog('QR customizations reset to default.', 'info');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.expanderButton}
                aria-expanded={isExpanded}
                aria-controls="qr-editor-section"
            >
                Advanced QR Editor <span aria-hidden="true">{isExpanded ? '▲' : '▼'}</span>
            </button>

            {isExpanded && (
                <div id="qr-editor-section" className={styles.qrEditor}>
                    <div className={styles.editorRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="qrFgColor">QR Color</label>
                            <input id="qrFgColor" type="color" value={qrFgColor} onChange={(e) => setQrFgColor(e.target.value)} className={styles.colorInput} aria-describedby="qr-editor-note" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="qrBgColor">Background Color</label>
                            <input id="qrBgColor" type="color" value={qrBgColor} onChange={(e) => setQrBgColor(e.target.value)} className={styles.colorInput} aria-describedby="qr-editor-note" />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="qr-logo-input">Add Logo</label>
                        <input id="qr-logo-input" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className={styles.fileInput} aria-describedby="qr-editor-note" />
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
                        <input id="stylishText" type="text" value={stylishText} onChange={(e) => setStylishText(e.target.value)} placeholder="e.g., Scan to Save" className={styles.textInput} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="stylishTextColor">Text Color</label>
                        <input id="stylishTextColor" type="color" value={stylishTextColor} onChange={(e) => setStylishTextColor(e.target.value)} className={styles.colorInput} />
                    </div>
                    <button onClick={onDownloadStylish} disabled={downloadDisabled} className={styles.stylishDownloadButton}>
                        Download Stylish QR
                    </button>
                    <button onClick={handleReset} className={styles.resetButton}>
                        Reset to Default
                    </button>
                </div>
            )}
        </>
    );
}