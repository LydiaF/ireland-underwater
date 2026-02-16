export interface Region {
  id: string;
  name: string;
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  bounds: [[number, number], [number, number]]; // [[west, south], [east, north]]
}

export const regions: Region[] = [
  {
    id: 'ireland',
    name: 'All of Ireland',
    center: [-8.0, 53.5],
    zoom: 6,
    bounds: [[-11.0, 51.0], [-5.0, 56.0]]
  },
  {
    id: 'dublin',
    name: 'Dublin Bay',
    center: [-6.2, 53.35],
    zoom: 9,
    bounds: [[-6.5, 53.1], [-5.9, 53.6]]
  },
  {
    id: 'galway',
    name: 'Galway Bay',
    center: [-9.0, 53.25],
    zoom: 9,
    bounds: [[-9.8, 52.9], [-8.2, 53.6]]
  },
  {
    id: 'cork',
    name: 'Cork & South Coast',
    center: [-8.5, 51.7],
    zoom: 8,
    bounds: [[-10.5, 51.3], [-6.5, 52.1]]
  },
  {
    id: 'donegal',
    name: 'Donegal Coast',
    center: [-8.3, 54.8],
    zoom: 8,
    bounds: [[-9.5, 54.3], [-7.1, 55.3]]
  },
  {
    id: 'shelf',
    name: 'Continental Shelf',
    center: [-10.0, 53.0],
    zoom: 5,
    bounds: [[-16.0, 49.0], [-4.0, 57.0]]
  }
];
