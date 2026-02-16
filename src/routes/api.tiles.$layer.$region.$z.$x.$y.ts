import { createFileRoute } from '@tanstack/react-router';
import { generateTileUrl, type TileParams } from '../lib/earthengine';

export const Route = createFileRoute('/api/tiles/$layer/$region/$z/$x/$y')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const url = new URL(request.url);
        const sealevel = parseFloat(url.searchParams.get('sealevel') || '0');
        const ex = url.searchParams.get('ex') || undefined;

        // Extract z, x, y from the filename (remove .png extension)
        const yParam = params.y.replace('.png', '');

        const tileParams: TileParams = {
          layer: params.layer as 'elevation' | 'hillshade' | 'shelf',
          region: params.region,
          z: parseInt(params.z),
          x: parseInt(params.x),
          y: parseInt(yParam),
          sealevel,
          ex,
        };

        try {
          // Get the Earth Engine tile URL
          const eeUrlTemplate = await generateTileUrl(tileParams);

          // Replace {x}, {y}, {z} placeholders with actual values
          const eeUrl = eeUrlTemplate
            .replace('{x}', params.x)
            .replace('{y}', yParam)
            .replace('{z}', params.z);

          // Fetch the tile from Earth Engine
          const response = await fetch(eeUrl);

          if (!response.ok) {
            return new Response('Tile not found', { status: 404 });
          }

          const imageBuffer = await response.arrayBuffer();

          // Return the image with proper headers
          return new Response(imageBuffer, {
            headers: {
              'Content-Type': 'image/png',
              'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
            },
          });
        } catch (error) {
          console.error('Error generating tile:', error);
          return new Response('Error generating tile', { status: 500 });
        }
      },
    },
  },
});
