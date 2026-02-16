# Ireland Underwater - Project Structure

## 📁 Project Overview

A full-stack TanStack Start application that visualizes sea level changes around Ireland using Google Earth Engine and ETOPO1 bedrock elevation data.

## 🗂️ Directory Structure

```
my-tanstack-start-app/
├── src/
│   ├── components/
│   │   ├── Map.tsx                    # MapLibre GL map component
│   │   ├── ControlPanel.tsx           # Kid-friendly control panel UI
│   │   └── Header.tsx                 # (original, not used)
│   │
│   ├── data/
│   │   └── regions.ts                 # Ireland region presets (6 regions)
│   │
│   ├── lib/
│   │   └── earthengine.ts             # Google Earth Engine integration
│   │
│   ├── routes/
│   │   ├── __root.tsx                 # Root layout (full-screen, no header)
│   │   ├── index.tsx                  # Main app page with map
│   │   ├── api.regions.ts             # GET /api/regions
│   │   ├── api.value.ts               # GET /api/value?lon=&lat=
│   │   └── api.tiles.$layer.$region.$z.$x.$y.ts  # Tile server
│   │
│   ├── App.css
│   └── styles.css                     # Global styles (full-screen layout)
│
├── earth-engine-service-account.json.template
├── SETUP.md                           # Detailed setup instructions
├── QUICKSTART.md                      # Quick reference guide
└── PROJECT_STRUCTURE.md               # This file
```

## 🎯 Key Components

### Frontend (`src/components/`)

#### **Map.tsx**
- Full-screen MapLibre GL JS map
- Handles three layer types:
  - `elevation`: Color-coded elevation (deep blue → land brown)
  - `hillshade`: Terrain shading overlay
  - `shelf`: Continental shelf highlight (0 to -200m)
- Dynamically updates based on region, sea level, and toggle states
- Navigation controls (zoom, pan)

#### **ControlPanel.tsx**
- Kid-friendly UI with:
  - Large buttons
  - Emojis for visual appeal
  - Clear labels
  - Region dropdown (6 presets)
  - Sea level slider (-100m to +200m)
  - Terrain toggle button
  - Shelf highlight toggle
  - Reset button
  - Helpful tip box

### Backend (`src/lib/` & `src/routes/api.*`)

#### **earthengine.ts**
- Initializes Google Earth Engine with service account
- Loads ETOPO1 bedrock dataset
- Generates map tiles with parameters:
  - Sea level adjustment
  - Layer type (elevation/hillshade/shelf)
- Caches tile URLs (1 hour TTL)
- Provides elevation lookup at specific coordinates

#### **API Routes**

**GET /api/regions**
- Returns array of region presets
- Each with: id, name, center coords, zoom, bounds

**GET /api/tiles/:layer/:region/:z/:x/:y.png**
- Query params: `?sealevel=0&ex=`
- Proxies tiles from Earth Engine
- Returns PNG image data
- Cached responses (24 hour client cache)

**GET /api/value?lon=&lat=**
- Returns bedrock elevation at coordinate
- Used for point queries (optional feature)

### Data (`src/data/`)

#### **regions.ts**
Six preset regions:
1. All of Ireland (full view)
2. Dublin Bay
3. Galway Bay
4. Cork & South Coast
5. Donegal Coast
6. Continental Shelf

Each includes:
- Center coordinates
- Default zoom level
- Bounding box

## 🔐 Security Features

- ✅ Service account JSON stored server-side only
- ✅ Never exposed to client
- ✅ In `.gitignore` (won't be committed)
- ✅ All Earth Engine calls happen on backend
- ✅ Tiles proxied through API (client never talks to EE directly)

## 🎨 Kid-Friendly Design

- **Large touch targets**: Buttons sized for easy clicking
- **Visual feedback**: Color changes on toggle states
- **Emojis everywhere**: 🌊 ⛰️ 🏖️ 🔄
- **Simple language**: No technical jargon
- **Clear controls**: One action per button
- **Helpful hints**: Tip box explains what to do
- **Smooth animations**: Flyto transitions between regions

## 🌍 Data Source

**NOAA NGDC ETOPO1**
- Global relief model
- 1 arc-minute resolution (~1.8km)
- Bedrock elevation (ice-free)
- Combines land and ocean bathymetry
- Available through Google Earth Engine: `'NOAA/NGDC/ETOPO1'`

## 🚀 Deployment Considerations

### Development
```bash
npm run dev
```

### Production (Cloudflare Workers)
```bash
npm run build
npm run deploy
```

**Important for production:**
- Upload service account JSON as Cloudflare secret
- Update `earthengine.ts` to read from environment
- Configure CORS if needed
- Set up proper error logging
- Monitor Earth Engine quota usage

## 📊 Technical Stack

- **Framework**: TanStack Start v1.132
- **Mapping**: MapLibre GL JS
- **Backend**: Google Earth Engine Node.js SDK
- **Caching**: node-cache
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Build Tool**: Vite

## 🔧 Configuration Files

- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Vite build configuration
- `wrangler.jsonc`: Cloudflare Workers config
- `.gitignore`: Includes service account JSON

## 📝 Next Steps

1. **Get Earth Engine access** (see SETUP.md)
2. **Add service account key**
3. **Run `npm install`**
4. **Run `npm run dev`**
5. **Visit http://localhost:3000**

## 🎓 Educational Use Cases

1. **Geology**: Explore continental shelf and ocean floor
2. **Climate Science**: Visualize sea level rise scenarios
3. **History**: Show ice age land bridges
4. **Geography**: Identify coastal features
5. **Math**: Discuss elevation, negative numbers, scales

## 🐛 Known Limitations

- First tile load may be slow (Earth Engine processing)
- Requires internet connection (fetches tiles)
- Limited by Earth Engine quota (free tier)
- ETOPO1 resolution not suitable for very local features
- Tile generation can timeout for very complex visualizations

## 💡 Future Enhancements

- [ ] Add legend showing color → elevation mapping
- [ ] Click map to show elevation at that point
- [ ] Save/share specific views via URL
- [ ] Add more regions (UK, Europe)
- [ ] Time slider for historical sea levels
- [ ] 3D terrain view
- [ ] Overlay population data
- [ ] Export screenshots
