import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner = () => {
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    // Create Html5QrcodeScanner instance
    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader', // Element ID for the scanner
      {
        fps: 20, // Frames per second
        qrbox: { width: 250, height: 250 }, // Scanning box size
      },
      false
    );

    // Callback for successful scan
    const onScanSuccess = (decodedText: string) => {
      setDecodedText(decodedText);
      setError(null);
      html5QrcodeScanner.clear(); // Stop scanner after successful scan
    };

    // Callback for scan failure
    const onScanFailure = (errorMessage: string) => {
      setError(errorMessage);
    };

    // Start scanning
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // Cleanup on component unmount
    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>QR Code Scanner</h1>
      <div
        id="qr-reader"
        ref={scannerRef}
        style={{ width: '300px', margin: 'auto' }}
      ></div>

      {decodedText && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>Decoded Text:</h3>
          <p>{decodedText}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
