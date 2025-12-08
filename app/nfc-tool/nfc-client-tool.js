'use client';

import { useState, useCallback } from 'react';
import styles from './page.module.css';

export default function NfcClientTool() {
    const [readLog, setReadLog] = useState([]);
    const [writeLog, setWriteLog] = useState([]);
    const [writeData, setWriteData] = useState('');
    const recordTypeDetails = {
        text: {
            placeholder: 'Enter any text',
            instruction: 'Writes a plain text record to the tag.',
        },
        url: {
            placeholder: 'https://example.com',
            instruction: 'Writes a URL. Make sure to include the protocol (e.g., https://).',
        },
        vcard: {
            instruction: 'Writes a contact card (vCard) to the tag. Fill in the details below.',
        },
    };
    const faqs = [
        {
            question: 'Which browsers and devices are supported?',
            answer: 'Web NFC is a new technology currently supported by Chrome on Android devices. It is not available on iOS (iPhone/iPad) or on desktop browsers like Chrome for Windows/Mac, Firefox, or Safari.',
        },
        {
            question: 'Why can\'t I clone the ID of a tag?',
            answer: 'The unique ID (UID) of an NFC tag is a read-only hardware identifier burned into the chip by the manufacturer. The Web NFC API, like most high-level APIs, does not allow changing this ID. Our "Clone" feature copies the NDEF data message from one tag to another, not the UID.',
        },
        {
            question: 'What is the difference between Erase and Format?',
            answer: '<strong>Erase:</strong> This removes the NDEF message (the data) from a tag, making it blank but keeping it formatted. You can write new data to it right away. <br/><strong>Format:</strong> This prepares a new or non-NDEF tag to be able to store NDEF data. It also erases any existing data in the process.',
        },
        {
            question: 'Is it safe to use the "Lock Tag" feature?',
            answer: 'Locking a tag is a permanent action. Once a tag is locked, it becomes read-only forever and cannot be erased, reformatted, or have its data changed. Use this feature with caution and only when you are certain the data on the tag should never be altered.',
        },
        {
            question: 'Why does the "Read Tag" scan stop after one tag?',
            answer: 'To provide a stable user experience and prevent accidental re-scans, the read operation is designed to stop after the first successful scan. You can simply press the "Start Scan" button again to read another tag.',
        },
    ];
    const [vCardData, setVCardData] = useState({ name: '', phone: '', email: '' });
    const [isScanning, setIsScanning] = useState(false);
    const [cloneLog, setCloneLog] = useState([]);
    const [clonedMessage, setClonedMessage] = useState(null);
    const [isCloning, setIsCloning] = useState(false);
    const [eraseLog, setEraseLog] = useState([]);
    const [showEraseConfirmation, setShowEraseConfirmation] = useState(false);
    const [formatLog, setFormatLog] = useState([]);
    const [lockLog, setLockLog] = useState([]);
    const [showLockConfirmation, setShowLockConfirmation] = useState(false);
    const [recordType, setRecordType] = useState('text');

    const addToLog = useCallback((setter, message) => {
        setter(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
    }, []);

    const handleRead = async () => {
        if (!('NDEFReader' in window)) {
            addToLog(setReadLog, 'Web NFC is not supported on this browser.');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            setIsScanning(true);
            addToLog(setReadLog, 'NFC scan started. Bring a tag close to your device.');

            await ndef.scan();

            ndef.addEventListener('reading', async ({ message, serialNumber }) => {
                try {
                    const controller = new AbortController();
                    controller.abort();
                    await ndef.write({ records: [{ recordType: "empty" }] }, { signal: controller.signal });
                    addToLog(setReadLog, `✅ Tag is writable.`);
                } catch (error) {
                    if (error.name === 'NotAllowedError' || error.name === 'InvalidStateError') {
                        addToLog(setReadLog, `🔒 Tag is read-only.`);
                    }
                }
                addToLog(setReadLog, `Tag detected! Serial Number: ${serialNumber}`);
                for (const record of message.records) {
                    addToLog(setReadLog, `> Record Type: ${record.recordType}`);
                    addToLog(setReadLog, `> Media Type: ${record.mediaType || 'N/A'}`);
                    addToLog(setReadLog, `> Record ID: ${record.id || 'N/A'}`);

                    switch (record.recordType) {
                        case 'text': {
                            const textDecoder = new TextDecoder(record.encoding);
                            addToLog(setReadLog, `> Content: ${textDecoder.decode(record.data)}`);
                            break;
                        }
                        case 'url': {
                            const textDecoder = new TextDecoder();
                            addToLog(setReadLog, `> URL: ${textDecoder.decode(record.data)}`);
                            break;
                        }
                        case 'mime':
                            if (record.mediaType === 'text/vcard') {
                                const vcardText = new TextDecoder().decode(record.data);
                                addToLog(setReadLog, `> vCard Content:`);
                                vcardText.split('\n').forEach(line => {
                                    if (line.trim()) addToLog(setReadLog, `  ${line.trim()}`);
                                });
                            } else {
                                addToLog(setReadLog, `> MIME Data: ${record.data ? new TextDecoder().decode(record.data) : 'No data'}`);
                            }
                            break;
                        default:
                            addToLog(setReadLog, `> Data: ${record.data ? new TextDecoder().decode(record.data) : 'No data'}`);
                    }
                }
                setIsScanning(false);
            });

            ndef.addEventListener('readingerror', () => {
                addToLog(setReadLog, 'Error reading NFC tag.');
                setIsScanning(false);
            });

        } catch (error) {
            addToLog(setReadLog, `Error: ${error.message}`);
            setIsScanning(false);
        }
    };

    const handleWrite = async () => {
        if (!('NDEFReader' in window)) {
            addToLog(setWriteLog, 'Web NFC is not supported on this browser.');
            return;
        }

        if (!writeData && recordType !== 'vcard') {
            addToLog(setWriteLog, 'Please enter data to write.');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            addToLog(setWriteLog, 'Ready to write. Bring a tag close to your device.');

            let record;
            if (recordType === 'url') {
                record = { recordType: 'url', data: writeData };
            } else if (recordType === 'vcard') {
                if (!vCardData.name) {
                    addToLog(setWriteLog, 'Please enter at least a name for the vCard.');
                    return;
                }
                const vCardString = `BEGIN:VCARD\nVERSION:3.0\nFN:${vCardData.name}\nTEL;TYPE=CELL:${vCardData.phone}\nEMAIL:${vCardData.email}\nEND:VCARD`;
                record = { recordType: 'mime', mediaType: 'text/vcard', data: vCardString };
            } else {
                record = { recordType: 'text', data: writeData };
            }

            if (!record) return;

            await ndef.write({
                records: [record]
            });

            if (recordType === 'vcard') {
                addToLog(setWriteLog, `Successfully wrote vCard for "${vCardData.name}" to the tag.`);
                setVCardData({ name: '', phone: '', email: '' });
            } else {
                addToLog(setWriteLog, `Successfully wrote [${recordType}] "${writeData}" to the tag.`);
            }
            setWriteData('');
        } catch (error) {
            addToLog(setWriteLog, `Write failed: ${error.message}`);
        }
    };

    const handleCloneRead = async () => {
        if (!('NDEFReader' in window)) {
            addToLog(setCloneLog, 'Web NFC is not supported on this browser.');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            setIsCloning(true);
            addToLog(setCloneLog, 'CLONE (Step 1): Scan the source tag to copy its data.');
            await ndef.scan();

            ndef.addEventListener('reading', ({ message }) => {
                setClonedMessage(message);
                addToLog(setCloneLog, `✅ Source tag read successfully. ${message.records.length} record(s) copied.`);
                addToLog(setCloneLog, 'Ready for CLONE (Step 2).');
                setIsCloning(false);
            });

            ndef.addEventListener('readingerror', () => {
                addToLog(setCloneLog, 'Error reading the source tag.');
                setIsCloning(false);
            });
        } catch (error) {
            addToLog(setCloneLog, `Error: ${error.message}`);
            setIsCloning(false);
        }
    };

    const handleCloneWrite = async () => {
        if (!clonedMessage) {
            addToLog(setCloneLog, 'No data to clone. Please read a source tag first.');
            return;
        }
        try {
            const ndef = new window.NDEFReader();
            addToLog(setCloneLog, 'CLONE (Step 2): Bring the new tag close to write the copied data.');
            await ndef.write(clonedMessage);
            addToLog(setCloneLog, '✅ New tag written successfully!');
            setClonedMessage(null);
        } catch (error) {
            addToLog(setCloneLog, `Write failed: ${error.message}`);
        }
    };

    const handleErase = async () => {
        setShowEraseConfirmation(false);
        if (!('NDEFReader' in window)) {
            addToLog(setEraseLog, 'Web NFC is not supported on this browser.');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            addToLog(setEraseLog, 'Ready to erase. Bring a tag close to your device.');
            await ndef.write("");
            addToLog(setEraseLog, '✅ Tag erased successfully.');
        } catch (error) {
            addToLog(setEraseLog, `Erase failed: ${error.message}`);
        }
    };

    const handleFormat = async () => {
        if (!('NDEFReader' in window)) {
            addToLog(setFormatLog, 'Web NFC is not supported on this browser.');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            addToLog(setFormatLog, 'Ready to format. Bring a tag close to your device.');
            await ndef.write("");
            addToLog(setFormatLog, '✅ Tag formatted successfully.');
        } catch (error) {
            addToLog(setFormatLog, `Format failed: ${error.message}`);
        }
    };

    const handleLock = async () => {
        setShowLockConfirmation(false);
        if (!('NDEFReader' in window)) {
            addToLog(setLockLog, 'Web NFC is not supported on this browser.');
            return;
        }

        try {
            const ndef = new window.NDEFReader();
            addToLog(setLockLog, 'Ready to lock. Bring a tag close to your device.');
            await ndef.makeReadOnly();
            addToLog(setLockLog, '✅ Tag locked successfully. It is now permanently read-only.');
        } catch (error) {
            addToLog(setLockLog, `Lock failed: ${error.message}`);
        }
    };

    const getCloneStatus = () => {
        if (isCloning) {
            return {
                className: styles.cloningStep1,
                message: 'Waiting for source tag... Hold it near your device.'
            };
        }
        if (clonedMessage) {
            return {
                className: styles.cloningStep2,
                message: 'Data copied! Now hold the new tag near your device to write.'
            };
        }
        return { className: '', message: 'Copy the data from one NFC tag to another.' };
    };

    const cloneStatus = getCloneStatus();

    return (
        <>
            <div className={styles.toolGrid}>
                <div className={`${styles.toolSection} ${isScanning ? styles.scanning : ''}`}>
                    <h3 className={styles.sectionTitle}>Read Tag</h3>
                    <button onClick={handleRead} disabled={isScanning} className={styles.actionButton}>
                        {isScanning ? 'Scanning...' : 'Start Scan'}
                    </button>
                    <div className={styles.logContainer}>
                        <div className={styles.logHeader}>
                            <h3>Read Log</h3>
                            <button onClick={() => setReadLog([])} className={styles.clearLogButton} disabled={readLog.length === 0}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.log}>
                            {readLog.length === 0 ? <p className={styles.emptyLogMessage}>No activity yet.</p> : readLog.map((entry, i) => <p key={i}>{entry}</p>)}
                        </div>
                    </div>
                </div>

                <div className={styles.toolSection}>
                    <h3 className={styles.sectionTitle}>Write Tag</h3>
                    <div className={styles.writeInputGroup}>
                        <select
                            value={recordType}
                            onChange={(e) => setRecordType(e.target.value)}
                            className={styles.recordTypeSelect}
                        >
                            <option value="text">Text</option>
                            <option value="url">URL</option>
                            <option value="vcard">Contact (vCard)</option>
                        </select>
                        {recordType !== 'vcard' && (
                            <input
                                type="text"
                                value={writeData}
                                onChange={(e) => setWriteData(e.target.value)}
                                placeholder={recordTypeDetails[recordType].placeholder}
                                className={styles.writeInput}
                            />
                        )}
                    </div>
                    {recordType === 'vcard' && (
                        <div className={styles.vcardForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="vcard-name">Name</label>
                                <input id="vcard-name" type="text" value={vCardData.name} onChange={(e) => setVCardData({ ...vCardData, name: e.target.value })} placeholder="John Doe" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="vcard-phone">Phone</label>
                                <input id="vcard-phone" type="tel" value={vCardData.phone} onChange={(e) => setVCardData({ ...vCardData, phone: e.target.value })} placeholder="9876543210" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="vcard-email">Email</label>
                                <input id="vcard-email" type="email" value={vCardData.email} onChange={(e) => setVCardData({ ...vCardData, email: e.target.value })} placeholder="john.doe@example.com" />
                            </div>
                        </div>
                    )}
                    <p className={styles.instructionText}>
                        {recordTypeDetails[recordType].instruction}
                    </p>
                    <button onClick={handleWrite} className={`${styles.actionButton} ${styles.writeButton}`} disabled={recordType === 'vcard' && !vCardData.name}>
                        Write to Tag
                    </button>
                    <div className={styles.logContainer}>
                        <div className={styles.logHeader}>
                            <h3>Write Log</h3>
                            <button onClick={() => setWriteLog([])} className={styles.clearLogButton} disabled={writeLog.length === 0}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.log}>
                            {writeLog.length === 0 ? <p className={styles.emptyLogMessage}>No activity yet.</p> : writeLog.map((entry, i) => <p key={i}>{entry}</p>)}
                        </div>
                    </div>
                </div>

                <div className={`${styles.toolSection} ${cloneStatus.className}`}>
                    <h3 className={styles.sectionTitle}>Clone Tag</h3>
                    <p className={styles.cloneStatusMessage}>{cloneStatus.message}</p>
                    <div className={styles.cloneSteps}>
                        <button onClick={handleCloneRead} disabled={isCloning || clonedMessage} className={`${styles.actionButton} ${styles.cloneButton}`}>
                            {isCloning ? 'Reading...' : 'Step 1: Read Source Tag'}
                        </button>
                        <button onClick={handleCloneWrite} disabled={!clonedMessage} className={`${styles.actionButton} ${styles.cloneButton}`}>
                            Step 2: Write to New Tag
                        </button>
                    </div>
                    <button
                        onClick={() => { setClonedMessage(null); setCloneLog([]); setIsCloning(false); }}
                        className={styles.resetCloneButton}
                        disabled={!clonedMessage && cloneLog.length === 0 && !isCloning}
                    >
                        Reset Clone
                    </button>
                    <div className={styles.logContainer}>
                        <div className={styles.logHeader}>
                            <h3>Clone Log</h3>
                            <button onClick={() => setCloneLog([])} className={styles.clearLogButton} disabled={cloneLog.length === 0}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.log}>
                            {cloneLog.length === 0 ? <p className={styles.emptyLogMessage}>No activity yet.</p> : cloneLog.map((entry, i) => <p key={i}>{entry}</p>)}
                        </div>
                    </div>
                </div>

                <div className={styles.toolSection}>
                    <h3 className={styles.sectionTitle}>Erase Tag</h3>
                    <p className={styles.sectionDescription}>This will remove all NDEF data from your tag.</p>
                    <button onClick={() => setShowEraseConfirmation(true)} className={`${styles.actionButton} ${styles.eraseButton}`}>
                        Erase NFC Tag
                    </button>
                    <div className={styles.logContainer}>
                        <div className={styles.logHeader}>
                            <h3>Erase Log</h3>
                            <button onClick={() => setEraseLog([])} className={styles.clearLogButton} disabled={eraseLog.length === 0}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.log}>
                            {eraseLog.length === 0 ? <p className={styles.emptyLogMessage}>No activity yet.</p> : eraseLog.map((entry, i) => <p key={i}>{entry}</p>)}
                        </div>
                    </div>
                </div>

                <div className={styles.toolSection}>
                    <h3 className={styles.sectionTitle}>Format Tag</h3>
                    <p className={styles.sectionDescription}>Prepare a new or non-NDEF tag for use by formatting it.</p>
                    <button onClick={handleFormat} className={`${styles.actionButton} ${styles.formatButton}`}>
                        Format Tag to NDEF
                    </button>
                    <div className={styles.logContainer}>
                        <div className={styles.logHeader}>
                            <h3>Format Log</h3>
                            <button onClick={() => setFormatLog([])} className={styles.clearLogButton} disabled={formatLog.length === 0}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.log}>
                            {formatLog.length === 0 ? <p className={styles.emptyLogMessage}>No activity yet.</p> : formatLog.map((entry, i) => <p key={i}>{entry}</p>)}
                        </div>
                    </div>
                </div>

                <div className={styles.toolSection}>
                    <h3 className={styles.sectionTitle}>Lock Tag (Make Read-Only)</h3>
                    <p className={styles.sectionDescription}>
                        <strong>Warning:</strong> This will make the tag permanently read-only. This action cannot be undone.
                    </p>
                    <button onClick={() => setShowLockConfirmation(true)} className={`${styles.actionButton} ${styles.lockButton}`}>
                        Lock NFC Tag
                    </button>
                    <div className={styles.logContainer}>
                        <div className={styles.logHeader}>
                            <h3>Lock Log</h3>
                            <button onClick={() => setLockLog([])} className={styles.clearLogButton} disabled={lockLog.length === 0}>
                                Clear
                            </button>
                        </div>
                        <div className={styles.log}>
                            {lockLog.length === 0 ? <p className={styles.emptyLogMessage}>No activity yet.</p> : lockLog.map((entry, i) => <p key={i}>{entry}</p>)}
                        </div>
                    </div>
                </div>
            </div>
            {showEraseConfirmation && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modalContent}>
                        <h3>Confirm Erase</h3>
                        <p>Are you sure you want to permanently erase the data on this NFC tag? This action cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => setShowEraseConfirmation(false)} className={styles.modalButton}>
                                Cancel
                            </button>
                            <button onClick={handleErase} className={`${styles.modalButton} ${styles.confirmButton}`}>
                                Yes, Erase Tag
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showLockConfirmation && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modalContent}>
                        <h3>Confirm Lock</h3>
                        <p>Are you sure you want to make this tag <strong>permanently</strong> read-only? You will not be able to write to it, erase it, or format it again.</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => setShowLockConfirmation(false)} className={styles.modalButton}>
                                Cancel
                            </button>
                            <button onClick={handleLock} className={`${styles.modalButton} ${styles.confirmButton}`}>
                                Yes, Lock Tag
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <section className={styles.faqSection}>
                <h3 className={styles.sectionTitle}>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <details key={index} className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>{faq.question}</summary>
                            <p
                                className={styles.faqAnswer}
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}