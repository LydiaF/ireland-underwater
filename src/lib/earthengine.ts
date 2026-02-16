import ee from '@google/earthengine';
import NodeCache from 'node-cache';

// Initialize cache with 1 hour TTL
const tileCache = new NodeCache({ stdTTL: 3600 });

let initialized = false;

export async function initializeEarthEngine() {
  if (initialized) return;

  try {
    let privateKey: any;

    // Check if running in Cloudflare Workers (environment variable available)
    if (process.env.EARTH_ENGINE_SERVICE_ACCOUNT) {
      privateKey = JSON.parse(process.env.EARTH_ENGINE_SERVICE_ACCOUNT);
    } else {
      // Local development - read from file (requires Node.js)
      const fs = await import('fs');
      const path = await import('path');
      const keyPath = path.join(process.cwd(), 'earth-engine-service-account.json');
      privateKey = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    }

    await new Promise<void>((resolve, reject) => {
      ee.data.authenticateViaPrivateKey(
        privateKey,
        () => {
          ee.initialize(null, null, () => {
            initialized = true;
            console.log('Earth Engine initialized successfully');
            resolve();
          }, reject);
        },
        reject
      );
    });
  } catch (error) {
    console.error('Failed to initialize Earth Engine:', error);
    throw error;
  }
}

export interface TileParams {
  layer: 'elevation' | 'hillshade' | 'shelf';
  region: string;
  z: number;
  x: number;
  y: number;
  sealevel?: number;
  ex?: string;
}

export async function getETOPO1Image(sealevel: number = 0) {
  // Load ETOPO1 bedrock elevation dataset
  const etopo = ee.Image('NOAA/NGDC/ETOPO1');
  const bedrock = etopo.select('bedrock');

  // Apply sea level adjustment
  const adjusted = bedrock.subtract(sealevel);

  return adjusted;
}

export async function generateTileUrl(params: TileParams): Promise<string> {
  await initializeEarthEngine();

  const cacheKey = JSON.stringify(params);
  const cached = tileCache.get<string>(cacheKey);
  if (cached) return cached;

  const elevation = await getETOPO1Image(params.sealevel || 0);

  let image: any;

  switch (params.layer) {
    case 'elevation': {
      // Color code: deep blue (underwater) to green/brown (land)
      const visParams = {
        min: -3000,
        max: 3000,
        palette: [
          '000033', '000055', '000088', '0000bb', '0033ff', // Deep to shallow water
          '66ccff', 'aaddff', 'ccffff', // Shallow water
          'e6f7ff', // Coast
          '90ee90', '228b22', '654321', '8b4513', 'a0522d' // Land
        ]
      };
      image = elevation.visualize(visParams);
      break;
    }

    case 'hillshade': {
      // Generate hillshade for terrain visualization
      const hillshade = ee.Terrain.hillshade(elevation);
      image = hillshade.visualize({ min: 0, max: 255, palette: ['000000', 'ffffff'] });
      break;
    }

    case 'shelf': {
      // Highlight continental shelf (0 to -200m)
      const shelf = elevation.gte(-200).and(elevation.lt(0));
      const shelfVis = shelf.visualize({
        min: 0,
        max: 1,
        palette: ['00000000', 'ffff00aa'] // Transparent to yellow highlight
      });
      image = shelfVis;
      break;
    }

    default:
      image = elevation.visualize({ min: -1000, max: 1000 });
  }

  // Get the map ID for tile serving
  const mapId = await new Promise<any>((resolve, reject) => {
    image.getMap({}, (obj: any, error: any) => {
      if (error) reject(error);
      else resolve(obj);
    });
  });

  const tileUrl = mapId.urlFormat;
  tileCache.set(cacheKey, tileUrl);

  return tileUrl;
}

export async function getElevationValue(lon: number, lat: number): Promise<number> {
  await initializeEarthEngine();

  const point = ee.Geometry.Point([lon, lat]);
  const etopo = ee.Image('NOAA/NGDC/ETOPO1').select('bedrock');

  const value = await new Promise<number>((resolve, reject) => {
    etopo.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: point,
      scale: 1000
    }).evaluate((result: any, error: any) => {
      if (error) reject(error);
      else resolve(result.bedrock);
    });
  });

  return value;
}
