import { useEffect, useRef, useState } from 'react';
import type { Region } from '../data/regions';

interface MapProps {
  region: Region;
  seaLevel: number;
  showHillshade: boolean;
  showShelf: boolean;
  onReset: () => void;
}

export default function Map({ region, seaLevel, showHillshade, showShelf, onReset }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Check dimensions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapContainer.current) return;

      const width = mapContainer.current.offsetWidth;
      const height = mapContainer.current.offsetHeight;
      setDimensions({ width, height });
      console.log('Container dimensions:', width, height);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a73e8',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}
      >
        🌊 Map Container Test 🌊
        <br />
        <div style={{ fontSize: '24px', marginTop: '20px', color: '#666' }}>
          Container: {dimensions.width} x {dimensions.height}
        </div>
        <div style={{ fontSize: '18px', marginTop: '10px', color: '#999' }}>
          Window: {typeof window !== 'undefined' ? window.innerWidth : 0} x {typeof window !== 'undefined' ? window.innerHeight : 0}
        </div>
        <div style={{ fontSize: '14px', marginTop: '20px', color: '#1a73e8' }}>
          Region: {region.name}<br />
          Sea Level: {seaLevel}m
        </div>
      </div>
    </div>
  );
}
