# 🌊 Ireland Underwater - Quick Start

## 1. Get Google Earth Engine Access

1. Sign up at [Google Earth Engine](https://code.earthengine.google.com/)
2. Create a Google Cloud project
3. Create a service account with Earth Engine access
4. Download the service account JSON key

## 2. Configure the App

```bash
# Copy the template
cp earth-engine-service-account.json.template earth-engine-service-account.json

# Edit it with your actual service account credentials
# (Use the JSON file you downloaded from Google Cloud)
```

## 3. Install & Run

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` 🎉

## 4. Using the App

**Kids can:**
- 🗺️ Choose different regions of Ireland from the dropdown
- 🌊 Move the sea level slider to see flooding/land exposure
- ⛰️ Toggle terrain view to see hills and valleys
- 🏖️ Highlight the continental shelf
- 🔄 Reset everything with one click

## Features Overview

### Region Presets
- All of Ireland (full view)
- Dublin Bay
- Galway Bay
- Cork & South Coast
- Donegal Coast
- Continental Shelf (wide view)

### Sea Level Range
- **-100m**: See what Ireland looked like during ice ages
- **0m**: Current sea level
- **+200m**: Extreme sea level rise scenarios

### Visual Layers
- **Base Elevation**: Color-coded from deep ocean (dark blue) to high land (brown)
- **Hillshade**: 3D terrain effect showing mountains and valleys
- **Shelf Highlight**: Yellow overlay showing the continental shelf area

## Classroom Ideas

1. **Ice Age Exploration**: Set sea level to -100m to see land bridges
2. **Climate Change**: Show +50m, +100m, +200m scenarios
3. **Geography**: Identify major features like bays, peninsulas, shelf
4. **Comparison**: Switch between regions to compare coastal features

## Troubleshooting

### "Failed to initialize Earth Engine"
→ Check your service account JSON is correct and in the right location

### Map tiles not loading
→ Make sure you've registered your service account with Earth Engine

### Blank screen
→ Check the browser console (F12) for errors

---

**Note**: The first time you load a region/setting, tiles may take a few seconds to generate from Earth Engine. After that, they're cached for faster loading!
