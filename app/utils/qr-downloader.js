export const downloadQRCode = ({
    qrCodeRef,
    filename,
    isStylish = false,
    qrBgColor = '#ffffff',
    stylishText = '',
    stylishTextColor = '#000000',
    stylishBg = null,
    addToLog = () => { },
}) => {
    const qrCanvas = qrCodeRef.current?.querySelector('canvas');
    if (!qrCanvas) {
        addToLog('QR Code not generated yet. Please fill in the required fields.', 'error');
        return;
    }

    const triggerDownload = (url, name) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    if (!isStylish) {
        // Simple QR code download
        const pngUrl = qrCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        triggerDownload(pngUrl, filename);
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
        triggerDownload(pngUrl, filename);
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