/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

interface Props {
  onScanned: (scannedText: string) => void;
}

const QRCodeScanner: React.FC<Props> = ({ onScanned }) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [scanned, setScannedText] = useState('');

  useEffect(() => {
    const video = videoElementRef.current;

    if (video) {
      // Check if video is not null
      const qrScanner = new QrScanner(
        video,
        (result) => {
          console.log('decoded qr code:', result);
          setScannedText(result.data);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();
      console.log('start');

      return () => {
        console.log(qrScanner);
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (scanned !== '') {
      onScanned(scanned); // Send scanned text to the parent
    }
  }, [scanned, onScanned]);

  return (
    <div>
      <video ref={videoElementRef} />
    </div>
  );
};

export default QRCodeScanner;
