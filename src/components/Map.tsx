import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
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
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (map.current) return;
    if (!mapContainer.current) return;

    const timer = setTimeout(() => {
      try {
        console.log('Initializing map...');

        map.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: 'https://demotiles.maplibre.org/style.json',
          center: region.center,
          zoom: region.zoom,
          attributionControl: false,
        });

        map.current.on('load', () => {
          console.log('Map loaded!');
          setIsLoading(false);
        });

        map.current.on('error', (e: any) => {
          console.error('Map error:', e);
          setError(e.error?.message || 'Map error');
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      } catch (err: any) {
        console.error('Failed to create map:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [region.center, region.zoom]);

  // Update region
  useEffect(() => {
    if (!map.current || isLoading) return;

    map.current.flyTo({
      center: region.center,
      zoom: region.zoom,
      essential: true,
    });
  }, [region, isLoading]);

  // Update layers
  useEffect(() => {
    if (!map.current || isLoading) return;

    const currentMap = map.current;

    // Remove existing layers
    ['elevation-layer', 'hillshade-layer', 'shelf-layer'].forEach(id => {
      if (currentMap.getLayer(id)) currentMap.removeLayer(id);
    });
    ['elevation', 'hillshade', 'shelf'].forEach(id => {
      if (currentMap.getSource(id)) currentMap.removeSource(id);
    });

    const buildTileUrl = (layer: string) =>
      `/api/tiles/${layer}/${region.id}/{z}/{x}/{y}.png?sealevel=${seaLevel}`;

    // Add elevation
    currentMap.addSource('elevation', {
      type: 'raster',
      tiles: [buildTileUrl('elevation')],
      tileSize: 256,
    });
    currentMap.addLayer({
      id: 'elevation-layer',
      type: 'raster',
      source: 'elevation',
      paint: { 'raster-opacity': 1 },
    });

    // Add hillshade
    if (showHillshade) {
      currentMap.addSource('hillshade', {
        type: 'raster',
        tiles: [buildTileUrl('hillshade')],
        tileSize: 256,
      });
      currentMap.addLayer({
        id: 'hillshade-layer',
        type: 'raster',
        source: 'hillshade',
        paint: { 'raster-opacity': 0.3 },
      });
    }

    // Add shelf
    if (showShelf) {
      currentMap.addSource('shelf', {
        type: 'raster',
        tiles: [buildTileUrl('shelf')],
        tileSize: 256,
      });
      currentMap.addLayer({
        id: 'shelf-layer',
        type: 'raster',
        source: 'shelf',
        paint: { 'raster-opacity': 0.6 },
      });
    }
  }, [region, seaLevel, showHillshade, showShelf, isLoading]);

  return (
    <div
      ref={mapContainer}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e0e0e0',
        zIndex: 0,
      }}
    >
      {(isLoading || error) && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: error ? '#ffebee' : 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '15px',
            fontSize: '24px',
            fontWeight: 'bold',
            zIndex: 1000,
            border: error ? '3px solid #c62828' : 'none',
          }}
        >
          {error ? `❌ Error: ${error}` : '🌊 Loading map...'}
        </div>
      )}
    </div>
  );
}
