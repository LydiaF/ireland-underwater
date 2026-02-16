# Ireland Underwater - Setup Guide

A classroom web application for visualizing sea level changes around Ireland using Google Earth Engine and ETOPO1 bedrock data.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Google Earth Engine Account** with a registered service account

## Google Earth Engine Setup

### 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable the Earth Engine API

### 2. Create a Service Account
- Navigate to **IAM & Admin** > **Service Accounts**
- Click **Create Service Account**
- Give it a name (e.g., "earth-engine-ireland-app")
- Grant the **Earth Engine Resource Writer** role
- Click **Done**

### 3. Generate Service Account Key
- Click on your newly created service account
- Go to the **Keys** tab
- Click **Add Key** > **Create New Key**
- Select **JSON** format
- Download the JSON key file

### 4. Register with Earth Engine
- Go to [Earth Engine](https://code.earthengine.google.com/)
- Sign up/register your project
- Make sure your service account email is registered

### 5. Configure the Application
- Copy `earth-engine-service-account.json.template` to `earth-engine-service-account.json`
- Replace the contents with your downloaded service account JSON key
- **IMPORTANT**: Never commit this file to git (it's in .gitignore)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Features

### Controls
- **Region Selector**: Choose from preset Ireland regions (Dublin Bay, Galway Bay, Cork, etc.)
- **Sea Level Slider**: Adjust sea level from -100m to +200m to visualize changes
- **Terrain Toggle**: Show/hide hillshade terrain visualization
- **Shelf Highlight**: Highlight the continental shelf (0 to -200m depth)
- **Reset Button**: Reset all settings to default

### API Endpoints

#### GET /api/regions
Returns available region presets with coordinates and bounds.

#### GET /api/tiles/:layer/:region/:z/:x/:y.png
Serves map tiles from Earth Engine.
- **layer**: `elevation`, `hillshade`, or `shelf`
- **region**: Region ID from regions list
- **Query params**:
  - `sealevel`: Sea level adjustment in meters (default: 0)

#### GET /api/value?lon=&lat=
Returns elevation value at a specific coordinate (optional feature).

## Data Source

Uses **NOAA NGDC ETOPO1** bedrock elevation dataset from Google Earth Engine:
- Global relief model
- 1 arc-minute resolution
- Bedrock elevation (removes ice sheets)

## Deployment

```bash
# Build for production
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

Make sure to upload your `earth-engine-service-account.json` as a Cloudflare Workers secret or environment variable for production deployment.

## Security Notes

⚠️ **IMPORTANT**: The service account key contains sensitive credentials:
- Never commit `earth-engine-service-account.json` to version control
- Never expose it to the client-side code
- All Earth Engine operations happen server-side only
- Tiles are proxied through your backend API

## Troubleshooting

### "Failed to initialize Earth Engine"
- Check that your service account JSON is valid
- Verify the service account is registered with Earth Engine
- Make sure Earth Engine API is enabled in Google Cloud Console

### Tiles not loading
- Check browser console for errors
- Verify your Earth Engine quota hasn't been exceeded
- Check that the ETOPO1 dataset is accessible

### Map not displaying
- Ensure MapLibre CSS is loading
- Check that the map container has valid dimensions
- Verify API routes are accessible

## Kid-Friendly Features

- Large, colorful buttons with emojis
- Simple, clear labels
- Visual feedback for all interactions
- Helpful tips and explanations
- Smooth animations and transitions

## License

Built for educational purposes using TanStack Start and Google Earth Engine.
