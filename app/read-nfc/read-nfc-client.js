'use client';

import { useState, useCallback } from 'react';
import PhonePreview from '../vcard/PhonePreview';
import styles from './page.module.css';

export default function ReadNfcClient() {
    const [log, setLog] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [lastScannedContent, setLastScannedContent] = useState(null);
    const [isVCard, setIsVCard] = useState(false);
    const [isWifi, setIsWifi] = useState(false);
    const [scannedWifiData, setScannedWifiData] = useState(null);
    const [scannedUrl, setScannedUrl] = useState(null);
    const [scannedVCardData, setScannedVCardData] = useState(null);
    const [tagDetails, setTagDetails] = useState(null);

    const addToLog = useCallback((message, type = 'info') => {
        const formattedMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        setLog(prev => [`<span class="${styles[type]}">[${new Date().toLocaleTimeString()}] ${formattedMessage}</span>`, ...prev]);
    }, []);

    const getTagTypeFromSize = (size) => {
        if (size <= 48) return 'NFC Forum Type 2 (e.g., NTAG210, MIFARE Ultralight)';
        if (size <= 144) return 'NFC Forum Type 2 (e.g., NTAG213)';
        if (size <= 504) return 'NFC Forum Type 2 (e.g., NTAG215)';
        if (size <= 888) return 'NFC Forum Type 2 (e.g., NTAG216)';
        if (size <= 2000) return 'NFC Forum Type 3 (e.g., FeliCa)';
        if (size <= 32000) return 'NFC Forum Type 4';
        if (size <= 64000) return 'NFC Forum Type 5';
        return 'Unknown Tag Type';
    };


    const parseVCard = (vcardText) => {
        const lines = vcardText.split('\n');
        const data = {};
        lines.forEach(line => {
            if (line.startsWith('FN:')) data.name = line.substring(3).trim();
            else if (line.startsWith('TITLE:')) data.title = line.substring(6).trim();
            else if (line.startsWith('ORG:')) data.organization = line.substring(4).trim();
            else if (line.startsWith('TEL;')) data.phone = line.split(':').pop().trim();
            else if (line.startsWith('EMAIL:')) data.email = line.substring(6).trim();
            else if (line.startsWith('URL:')) data.website = line.substring(4).trim();
            else if (line.startsWith('ADR;')) {
                const parts = line.split(';').slice(2); // Skip ADR and TYPE
                data.street = parts[1] || '';
                data.city = parts[2] || '';
                data.state = parts[3] || '';
                data.zip = parts[4] || '';
                data.country = parts[5] || '';
            }
        });
        return data;
    };

    const parseWifiString = (wifiString) => {
        if (!wifiString.startsWith('WIFI:')) return null;

        const data = {};
        const unescape = (str) => str.replace(/\\([\\;,"])/g, '$1');

        // Extract content between WIFI: and the final ;;
        const coreString = wifiString.substring(5, wifiString.lastIndexOf(';;'));

        const parts = coreString.split(';');

        for (const part of parts) {
            if (part.startsWith('S:')) {
                data.ssid = unescape(part.substring(2));
            } else if (part.startsWith('P:')) {
                data.password = unescape(part.substring(2));
            } else if (part.startsWith('T:')) {
                data.encryption = part.substring(2);
            }
        }
        return Object.keys(data).length > 0 ? data : null;
    };

    const handleRead = async () => {
        setLastScannedContent(null); // Reset content on new scan
        setIsVCard(false); // Reset vCard flag on new scan
        setIsWifi(false);
        setScannedVCardData(null); // Reset vCard data on new scan
        setScannedWifiData(null);
        setScannedUrl(null); // Reset URL on new scan
        setTagDetails(null); // Reset tag details on new scan
        if (!('NDEFReader' in window)) {
            addToLog('Web NFC is not supported on this browser. Please use Chrome on Android.', 'error');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            setIsScanning(true);
            addToLog('Scan started. Bring a tag close to your device.', 'info');

            await ndef.scan();

            ndef.addEventListener("reading", async ({ message, serialNumber }) => {
                addToLog(`✅ Tag detected! Serial Number: ${serialNumber}`, 'success');
                let firstRecordContent = null;
                let totalSize = 0;
                let isWritable = null;
                const recordTypes = [];

                // Check writability
                try {
                    const controller = new AbortController();
                    setTimeout(() => controller.abort(), 500); // Timeout to prevent getting stuck
                    await ndef.write({ records: [{ recordType: "empty" }] }, { signal: controller.signal, overwrite: false });
                    isWritable = true;
                    addToLog('Tag is writable.', 'info');
                    // This is a trick: if write succeeds with overwrite:false, it means it's writable but we didn't actually write anything.
                    // However, the simplest check is to just try writing and see if it fails with a read-only error.
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        isWritable = false;
                        addToLog('Tag is read-only.', 'info');
                    }
                }

                for (const record of message.records) {
                    recordTypes.push(record.recordType);
                    addToLog(`> Record Type: ${record.recordType}`, 'info');
                    addToLog(`> Media Type: ${record.mediaType || 'N/A'}`, 'info');
                    let currentRecordContent = null;

                    if (record.data) {
                        totalSize += record.data.byteLength;
                    }

                    switch (record.recordType) {
                        case "text": {
                            const textDecoder = new TextDecoder(record.encoding);
                            currentRecordContent = textDecoder.decode(record.data);
                            addToLog(`> Content: ${currentRecordContent}`, 'info');
                            if (currentRecordContent.startsWith('WIFI:')) {
                                const parsedData = parseWifiString(currentRecordContent);
                                if (parsedData) {
                                    setScannedWifiData(parsedData);
                                    addToLog(`Parsed WiFi credentials for SSID: ${parsedData.ssid || 'Unknown'}`, 'success');
                                    setIsWifi(true);
                                }
                            }
                            break;
                        }
                        case "url": {
                            const textDecoder = new TextDecoder();
                            currentRecordContent = textDecoder.decode(record.data);
                            setScannedUrl(currentRecordContent);
                            addToLog(`> URL: <a href="${currentRecordContent}" target="_blank" rel="noopener noreferrer">${currentRecordContent}</a>`, 'info');
                            break;
                        }
                        case "mime":
                            if (record.mediaType === "text/vcard") {
                                const vcardText = new TextDecoder().decode(record.data);
                                currentRecordContent = vcardText;
                                const parsedData = parseVCard(vcardText);
                                setScannedVCardData(parsedData);
                                addToLog(`Parsed vCard for: ${parsedData.name || 'Unknown'}`, 'success');
                                setIsVCard(true);
                            } else {
                                addToLog(`> MIME Data (unsupported): ${record.mediaType}`, 'info');
                            }
                            break;
                        default:
                            addToLog(`> Data (unsupported type): ${record.recordType}`, 'info');
                    }

                    if (currentRecordContent && !firstRecordContent) {
                        firstRecordContent = currentRecordContent;
                    }
                }
                addToLog(`Total data size: ${totalSize} bytes`, 'info');
                const tagType = getTagTypeFromSize(totalSize);
                addToLog(`Likely Tag Type: ${tagType}`, 'info');

                setTagDetails({
                    serialNumber,
                    size: totalSize,
                    type: tagType,
                    isWritable: isWritable === null ? 'Unknown' : (isWritable ? 'Yes' : 'No'),
                    recordCount: message.records.length,
                    recordTypes: recordTypes.join(', ') || 'N/A',
                });
                setLastScannedContent(firstRecordContent);
                setIsScanning(false); // Stop scanning after first read
            });

            ndef.addEventListener("readingerror", () => {
                addToLog('Error reading NFC tag. Please try again.', 'error');
                setIsScanning(false);
            });

        } catch (error) {
            addToLog(`Error: ${error.message}`, 'error');
            setIsScanning(false);
        }
    };

    const handleCopy = () => {
        if (!lastScannedContent) return;
        navigator.clipboard.writeText(lastScannedContent).then(() => {
            addToLog('✅ Content copied to clipboard!', 'success');
        }, () => {
            addToLog('Failed to copy content.', 'error');
        });
    };

    const handleSaveVCard = () => {
        if (!lastScannedContent || !isVCard) return;

        const blob = new Blob([lastScannedContent], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Try to find a name from the vCard data for the filename
        const nameMatch = lastScannedContent.match(/^FN:(.*)$/m);
        const fileName = nameMatch ? `${nameMatch[1].trim().replace(/\s+/g, '_')}.vcf` : 'contact.vcf';
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        addToLog('✅ vCard file saved.', 'success');
    };

    return (
        <div className={styles.toolContainer}>
            <div className={styles.actionButtonsContainer}>
                <button onClick={handleRead} disabled={isScanning} className={styles.actionButton}>
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                </button>
                {lastScannedContent && (
                    <button onClick={handleCopy} className={styles.copyButton}>
                        Copy Content
                    </button>
                )}
                {isVCard && lastScannedContent && (
                    <button onClick={handleSaveVCard} className={`${styles.copyButton} ${styles.saveVcfButton}`}>
                        Save vCard (.vcf)
                    </button>
                )}
                {scannedUrl && (
                    <a href={scannedUrl} target="_blank" rel="noopener noreferrer" className={`${styles.copyButton} ${styles.openUrlButton}`}>
                        Open URL
                    </a>
                )}
            </div>
            {tagDetails && (
                <div className={styles.tagInfoContainer}>
                    <p><strong>Serial Number:</strong> <span>{tagDetails.serialNumber}</span></p>
                    <p><strong>Data Size:</strong> <span>{tagDetails.size} bytes</span></p>
                    <p><strong>Est. Tag Type:</strong> <span>{tagDetails.type}</span></p>
                    <p><strong>Writable:</strong> <span>{tagDetails.isWritable}</span></p>
                    <p><strong>Record Count:</strong> <span>{tagDetails.recordCount}</span></p>
                    <p><strong>Record Types:</strong> <span>{tagDetails.recordTypes}</span></p>
                </div>
            )}
            {scannedVCardData && (
                <div className={styles.phonePreviewContainer}>
                    <PhonePreview vCardData={scannedVCardData} />
                </div>
            )}
            {isWifi && scannedWifiData && (
                <div className={styles.tagInfoContainer}>
                    <h3>WiFi Network Details</h3>
                    <p><strong>SSID:</strong> <span>{scannedWifiData.ssid}</span></p>
                    <p><strong>Password:</strong> <span>{scannedWifiData.password || 'No Password'}</span></p>
                    <p><strong>Encryption:</strong> <span>{scannedWifiData.encryption || 'Unknown'}</span></p>
                    {scannedWifiData.password && (
                        <button onClick={() => {
                            navigator.clipboard.writeText(scannedWifiData.password);
                            addToLog('✅ Password copied to clipboard!', 'success');
                        }} className={styles.copyButton}>
                            Copy Password
                        </button>
                    )}
                    <p className={styles.instructionText} style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                        For security reasons, browsers cannot automatically connect to WiFi. Please copy the password and connect manually in your device&apos;s settings.
                    </p>
                </div>
            )}
            <p className={styles.instructionText}>
                Click &quot;Start Scan&quot; and bring an NFC tag close to the back of your phone.
            </p>
            <div className={styles.logContainer}>
                <div className={styles.logHeader}>
                    <h3>Scan Log</h3>
                    <button onClick={() => setLog([])} className={styles.clearLogButton} disabled={log.length === 0}>
                        Clear
                    </button>
                </div>
                <div className={styles.log} dangerouslySetInnerHTML={{ __html: log.join('<br />') }} />
            </div>
        </div>
    );
}