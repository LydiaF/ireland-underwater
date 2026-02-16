import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Map from '../components/Map'
import ControlPanel from '../components/ControlPanel'
import { regions } from '../data/regions'

export const Route = createFileRoute('/')({
  component: App
})

function App() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0])
  const [seaLevel, setSeaLevel] = useState(0)
  const [showHillshade, setShowHillshade] = useState(false)
  const [showShelf, setShowShelf] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only render map on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleReset = () => {
    setSelectedRegion(regions[0])
    setSeaLevel(0)
    setShowHillshade(false)
    setShowShelf(false)
  }

  if (!isMounted) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🌊 Loading Ireland Underwater...
      </div>
    )
  }

  return (
    <>
      <Map
        region={selectedRegion}
        seaLevel={seaLevel}
        showHillshade={showHillshade}
        showShelf={showShelf}
        onReset={handleReset}
      />
      <ControlPanel
        regions={regions}
        selectedRegion={selectedRegion}
        seaLevel={seaLevel}
        showHillshade={showHillshade}
        showShelf={showShelf}
        onRegionChange={setSelectedRegion}
        onSeaLevelChange={setSeaLevel}
        onHillshadeToggle={() => setShowHillshade(!showHillshade)}
        onShelfToggle={() => setShowShelf(!showShelf)}
        onReset={handleReset}
      />
    </>
  )
}
