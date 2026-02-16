import { useState, useEffect } from 'react';
import type { Region } from '../data/regions';

interface ControlPanelProps {
  regions: Region[];
  selectedRegion: Region;
  seaLevel: number;
  showHillshade: boolean;
  showShelf: boolean;
  onRegionChange: (region: Region) => void;
  onSeaLevelChange: (level: number) => void;
  onHillshadeToggle: () => void;
  onShelfToggle: () => void;
  onReset: () => void;
}

export default function ControlPanel({
  regions,
  selectedRegion,
  seaLevel,
  showHillshade,
  showShelf,
  onRegionChange,
  onSeaLevelChange,
  onHillshadeToggle,
  onShelfToggle,
  onReset,
}: ControlPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        minWidth: '280px',
        maxWidth: '320px',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#0066cc',
          marginTop: 0,
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        🌊 Ireland Underwater 🌊
      </h1>

      {/* Region Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
          }}
        >
          📍 Choose a Place:
        </label>
        <select
          value={selectedRegion.id}
          onChange={(e) => {
            const region = regions.find((r) => r.id === e.target.value);
            if (region) onRegionChange(region);
          }}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #0066cc',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sea Level Slider */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
          }}
        >
          🌡️ Sea Level: {seaLevel > 0 ? '+' : ''}{seaLevel}m
        </label>
        <input
          type="range"
          min="-100"
          max="200"
          step="10"
          value={seaLevel}
          onChange={(e) => onSeaLevelChange(parseInt(e.target.value))}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#666',
            marginTop: '5px',
          }}
        >
          <span>-100m</span>
          <span>+200m</span>
        </div>
      </div>

      {/* Hillshade Toggle */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={onHillshadeToggle}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: showHillshade ? '#28a745' : '#e0e0e0',
            color: showHillshade ? 'white' : '#666',
            transition: 'all 0.2s',
          }}
        >
          ⛰️ {showHillshade ? 'Hide' : 'Show'} Terrain
        </button>
      </div>

      {/* Shelf Highlight Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={onShelfToggle}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: showShelf ? '#ffc107' : '#e0e0e0',
            color: showShelf ? '#333' : '#666',
            transition: 'all 0.2s',
          }}
        >
          🏖️ {showShelf ? 'Hide' : 'Show'} Shelf
        </button>
      </div>

      {/* Reset Button */}
      <div>
        <button
          onClick={onReset}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '10px',
            border: '2px solid #dc3545',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#dc3545',
            transition: 'all 0.2s',
          }}
        >
          🔄 Reset All
        </button>
      </div>

      {/* Info Text */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#0066cc',
          textAlign: 'center',
        }}
      >
        <strong>💡 Tip:</strong> Move the slider to see what Ireland would look like with
        different sea levels!
      </div>
    </div>
  );
}
