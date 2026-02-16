import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
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

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [],
      },
      center: region.center,
      zoom: region.zoom,
      maxBounds: [[-180, -85], [180, 85]],
    });

    map.current.on('load', () => {
      setIsLoading(false);
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update region
  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center: region.center,
      zoom: region.zoom,
      essential: true,
    });
  }, [region]);

  // Update layers when parameters change
  useEffect(() => {
    if (!map.current || isLoading) return;

    const currentMap = map.current;

    // Remove existing sources and layers
    if (currentMap.getLayer('elevation-layer')) currentMap.removeLayer('elevation-layer');
    if (currentMap.getLayer('hillshade-layer')) currentMap.removeLayer('hillshade-layer');
    if (currentMap.getLayer('shelf-layer')) currentMap.removeLayer('shelf-layer');
    if (currentMap.getSource('elevation')) currentMap.removeSource('elevation');
    if (currentMap.getSource('hillshade')) currentMap.removeSource('hillshade');
    if (currentMap.getSource('shelf')) currentMap.removeSource('shelf');

    // Build tile URL with sea level parameter
    const buildTileUrl = (layer: string) =>
      `/api/tiles/${layer}/${region.id}/{z}/{x}/{y}.png?sealevel=${seaLevel}`;

    // Add elevation source and layer
    currentMap.addSource('elevation', {
      type: 'raster',
      tiles: [buildTileUrl('elevation')],
      tileSize: 256,
    });

    currentMap.addLayer({
      id: 'elevation-layer',
      type: 'raster',
      source: 'elevation',
      paint: {
        'raster-opacity': 1,
      },
    });

    // Add hillshade if enabled
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
        paint: {
          'raster-opacity': 0.3,
        },
      });
    }

    // Add shelf highlight if enabled
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
        paint: {
          'raster-opacity': 0.6,
        },
      });
    }
  }, [region, seaLevel, showHillshade, showShelf, isLoading]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '10px',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          🌊 Loading map...
        </div>
      )}
    </div>
  );
}
