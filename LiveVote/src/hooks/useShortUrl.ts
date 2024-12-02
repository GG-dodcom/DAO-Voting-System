import { useRef } from 'react';

export function useShortUrls() {
  const shortUrls = useRef<string[]>([]);

  const containsShortUrl = (text: string): boolean => {
    if (shortUrls.current.length === 0) return false; // Access current value of useRef

    return shortUrls.current.some(
      (shortUrl) =>
        text.includes(`http://${shortUrl}/`) ||
        text.includes(`https://${shortUrl}/`) ||
        text.includes(`.${shortUrl}/`)
    );
  };
  return { containsShortUrl };
}
