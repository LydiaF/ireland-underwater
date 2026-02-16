import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Map from '../components/Map'
import ControlPanel from '../components/ControlPanel'
import { regions } from '../data/regions'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0])
  const [seaLevel, setSeaLevel] = useState(0)
  const [showHillshade, setShowHillshade] = useState(false)
  const [showShelf, setShowShelf] = useState(false)

  const handleReset = () => {
    setSelectedRegion(regions[0])
    setSeaLevel(0)
    setShowHillshade(false)
    setShowShelf(false)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
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
    </div>
  )
}
