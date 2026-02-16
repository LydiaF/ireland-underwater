import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { regions } from '../data/regions';

export const Route = createFileRoute('/api/regions')({
  server: {
    handlers: {
      GET: () => json(regions),
    },
  },
});
