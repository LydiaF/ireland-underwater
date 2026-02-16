import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { getElevationValue } from '../lib/earthengine';

export const Route = createFileRoute('/api/value')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const lon = parseFloat(url.searchParams.get('lon') || '0');
        const lat = parseFloat(url.searchParams.get('lat') || '0');

        if (!lon || !lat) {
          return json({ error: 'Missing lon or lat parameter' }, { status: 400 });
        }

        try {
          const elevation = await getElevationValue(lon, lat);
          return json({ lon, lat, elevation });
        } catch (error) {
          console.error('Error getting elevation:', error);
          return json({ error: 'Failed to get elevation' }, { status: 500 });
        }
      },
    },
  },
});
