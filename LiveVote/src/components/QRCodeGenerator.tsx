import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState(''); // State to store user input
  const qrCodeRef = useRef<HTMLDivElement | null>(null); // Reference to the QR code container

  // Function to download the QR code
  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;

    // Access the canvas element within the QR code container
    const canvas = qrCodeRef.current.querySelector('canvas');
    if (!canvas) return;

    // Convert canvas to a downloadable PNG image
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <div ref={qrCodeRef} style={{ margin: '20px 20px' }}>
        {/* Render QR code only if text is provided */}
        {text && <QRCodeCanvas value={text} size={256} />}
      </div>
      {text && (
        <button
          onClick={downloadQRCode}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
