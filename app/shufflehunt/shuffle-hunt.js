'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './shuffle-hunt.module.css';

export default function ShuffleHuntGame() {
    const [log, setLog] = useState([]);
    const [gameState, setGameState] = useState('setup'); // setup, playing, won
    const [registeredTags, setRegisteredTags] = useState([]);
    const [gameSequence, setGameSequence] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isNfcScanning, setIsNfcScanning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef(null);

    // Refs for accessing state inside event listeners and debouncing
    const stateRef = useRef({
        gameState: 'setup',
        registeredTags: [],
        gameSequence: [],
        currentStep: 0,
        startTime: null
    });
    const lastReadRef = useRef({ serial: null, time: 0 });

    // Sync refs
    useEffect(() => {
        stateRef.current = { gameState, registeredTags, gameSequence, currentStep, startTime };
    }, [gameState, registeredTags, gameSequence, currentStep, startTime]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const addToLog = useCallback((message, type = 'info') => {
        setLog(prev => [`<span class="${styles[type] || ''}">[${new Date().toLocaleTimeString()}] ${message}</span>`, ...prev]);
    }, []);

    const handleTagRead = useCallback((serialNumber) => {
        const now = Date.now();
        // Simple debounce: Ignore the same tag if read within 1.5 seconds to prevent accidental double-reads
        if (serialNumber === lastReadRef.current.serial && now - lastReadRef.current.time < 1500) {
            return;
        }
        lastReadRef.current = { serial: serialNumber, time: now };

        const { gameState, registeredTags, gameSequence, currentStep, startTime } = stateRef.current;

        if (!serialNumber) {
            addToLog('Tag detected but could not read Serial Number.', 'error');
            return;
        }

        if (gameState === 'setup') {
            const exists = registeredTags.includes(serialNumber);
            if (!exists) {
                setRegisteredTags(prev => [...prev, serialNumber]);
                addToLog(`✅ Card registered! (ID: ...${serialNumber.slice(-4)})`, 'success');
            } else {
                addToLog(`ℹ️ Card already registered.`, 'info');
            }
        } else if (gameState === 'playing') {
            const targetSerial = gameSequence[currentStep];

            if (serialNumber === targetSerial) {
                // Correct card
                const nextStep = currentStep + 1;
                if (nextStep >= gameSequence.length) {
                    setGameState('won');
                    clearInterval(timerRef.current);
                    const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);
                    addToLog(`🎉 YOU WIN! Sequence completed in ${finalTime}s!`, 'success');
                } else {
                    setCurrentStep(nextStep);
                    addToLog(`✅ Correct! That was Card #${currentStep + 1}. Now find Card #${nextStep + 1}`, 'success');
                }
            } else {
                // Wrong card
                setCurrentStep(0);
                addToLog(`❌ Wrong card! Resetting to Card #1.`, 'error');
            }
        }
    }, [addToLog]);

    const startNfcScan = async () => {
        if (!('NDEFReader' in window)) {
            addToLog('Web NFC is not supported on this browser. Please use Chrome on Android.', 'error');
            return;
        }

        if (isNfcScanning) return;

        try {
            const ndef = new window.NDEFReader();
            await ndef.scan();
            setIsNfcScanning(true);
            addToLog('📡 NFC Scanner started. Tap cards to register.', 'info');

            ndef.onreading = (event) => {
                handleTagRead(event.serialNumber);
            };

            ndef.onreadingerror = () => {
                addToLog('Error reading NFC tag. Try again.', 'error');
            };

        } catch (error) {
            addToLog(`Error starting NFC: ${error.message}`, 'error');
        }
    };

    const startGame = () => {
        if (registeredTags.length < 2) {
            addToLog('Please register at least 2 cards to play.', 'error');
            return;
        }

        // Shuffle
        const shuffled = [...registeredTags].sort(() => Math.random() - 0.5);
        setGameSequence(shuffled);
        setCurrentStep(0);
        setGameState('playing');

        const start = Date.now();
        setStartTime(start);
        setElapsedTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - start);
        }, 100);

        addToLog('🎲 Game Started! The cards have been shuffled.', 'info');
        addToLog('👉 Find Card #1', 'info');
    };

    const resetGame = () => {
        setGameState('setup');
        setRegisteredTags([]);
        setGameSequence([]);
        setCurrentStep(0);

        if (timerRef.current) clearInterval(timerRef.current);
        setStartTime(null);
        setElapsedTime(0);

        addToLog('Game reset. Register new cards.', 'info');
    };

    const formatTime = (ms) => (ms / 1000).toFixed(1);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>NFC Shuffle Hunt</h1>
                <p>Register cards, shuffle them, and find them in the correct order!</p>
            </div>

            <div className={styles.toolLayout}>
                <div className={styles.form}>
                    {gameState === 'setup' && (
                        <div className={styles.inputGroup}>
                            <h2>1. Setup</h2>
                            <p>Tap NFC cards to register them for the game.</p>

                            {!isNfcScanning && (
                                <button onClick={startNfcScan} className={styles.actionButton}>
                                    Start NFC Scanner
                                </button>
                            )}

                            <div className={styles.cardListContainer}>
                                <strong>Registered Cards: {registeredTags.length}</strong>
                                <ul className={styles.cardList}>
                                    {registeredTags.map((tag, i) => (
                                        <li key={i}>Card {i + 1} (ID: ...{tag.slice(-4)})</li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={startGame}
                                disabled={registeredTags.length < 2}
                                className={styles.actionButton}
                                style={{ marginTop: '1rem', backgroundColor: registeredTags.length < 2 ? '#ccc' : '#28a745' }}
                            >
                                Start Game
                            </button>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <div className={styles.inputGroup}>
                            <h2>2. Play</h2>
                            <div className={styles.gameDisplay}>
                                <div className={styles.timer}>
                                    ⏱️ {formatTime(elapsedTime)}s
                                </div>
                                <h3>Find Card</h3>
                                <div className={styles.targetNumber}>
                                    #{currentStep + 1}
                                </div>
                                <p>Tap a card to see if it&apos;s the correct one!</p>
                            </div>
                            <button onClick={resetGame} className={styles.downloadButton}>
                                Reset Game
                            </button>
                        </div>
                    )}

                    {gameState === 'won' && (
                        <div className={styles.inputGroup}>
                            <h2 style={{ color: '#28a745' }}>🎉 You Won! 🎉</h2>
                            <div className={styles.gameDisplay}>
                                <h3>Final Time</h3>
                                <div className={styles.targetNumber} style={{ fontSize: '3rem' }}>
                                    {formatTime(elapsedTime)}s
                                </div>
                                <p>You found all {gameSequence.length} cards in order.</p>
                            </div>
                            <button onClick={startGame} className={styles.actionButton}>
                                Play Again (Reshuffle)
                            </button>
                            <button onClick={resetGame} className={styles.downloadButton}>
                                New Game (Reset Cards)
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.logContainer}>
                    <div className={styles.logHeader}>
                        <h3>Game Log</h3>
                        <button onClick={() => setLog([])} className={styles.clearLogButton} disabled={log.length === 0}>
                            Clear
                        </button>
                    </div>
                    <div className={styles.log} dangerouslySetInnerHTML={{ __html: log.join('<br />') }} aria-live="polite" />
                </div>
            </div>
        </div>
    );
}