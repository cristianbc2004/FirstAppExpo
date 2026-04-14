import { Restaurant } from '@/types/restaurant';
import { getDistanceMeters } from '@/utils/location';

// Este tipo representa cada elemento que devuelve la API de Overpass.
type OverpassElement = {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string | undefined>;
};

// URL del servicio de OpenStreetMap que vamos a consultar.
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
// Radio de busqueda en metros alrededor de la ubicacion del usuario.
const SEARCH_RADIUS_METERS = 2500;
// Limite de restaurantes que vamos a mostrar en la app.
const MAX_RESULTS = 12;

function getCoordinate(element: OverpassElement) {
  // Algunos elementos vienen con lat/lon directos.
  if (typeof element.lat === 'number' && typeof element.lon === 'number') {
    return { latitude: element.lat, longitude: element.lon };
  }

  // Otros elementos como "way" o "relation" pueden venir con un centro calculado.
  if (element.center) {
    return { latitude: element.center.lat, longitude: element.center.lon };
  }

  // Si no hay coordenadas, no podemos usar ese restaurante.
  return null;
}

function getCuisineLabel(cuisine?: string) {
  // Si la API no informa el tipo de cocina, devolvemos un texto por defecto.
  if (!cuisine) {
    return 'Local cuisine';
  }

  // La API puede devolver varias cocinas separadas por ";" y aqui las limpiamos y formateamos.
  return cuisine
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' • ');
}

function getAddress(tags: Record<string, string | undefined> = {}) {
  // Construimos una direccion legible a partir de las partes disponibles.
  const addressParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:city'],
  ].filter(Boolean);

  if (addressParts.length > 0) {
    return addressParts.join(', ');
  }

  // Si no hay direccion estructurada, intentamos usar una direccion general.
  return tags.address ?? 'Address not available';
}

function getOpenLabel(openingHours?: string) {
  // Si no existen horarios en la API, mostramos un texto por defecto.
  if (!openingHours) {
    return 'Hours not available';
  }

  return `Hours: ${openingHours}`;
}

export async function fetchNearbyRestaurants(
  latitude: number,
  longitude: number
) {
  // Esta consulta busca restaurantes alrededor de una latitud y longitud dadas.
  const query = `
[out:json][timeout:25];
(
  node["amenity"="restaurant"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
  way["amenity"="restaurant"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
  relation["amenity"="restaurant"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
);
out center tags;
`;

  // Enviamos la consulta al servicio de Overpass usando POST.
  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: query,
  });

  // Si la API responde con error, detenemos el flujo.
  if (!response.ok) {
    throw new Error('Unable to load restaurants near your location.');
  }

  // Convertimos la respuesta a JSON y tipamos su estructura esperada.
  const data = (await response.json()) as { elements?: OverpassElement[] };

  // Transformamos la respuesta cruda de la API en objetos Restaurant que usa la app.
  const restaurants = (data.elements ?? [])
    .map((element): Restaurant | null => {
      const coordinate = getCoordinate(element);

      // Ignoramos elementos que no tengan coordenadas validas.
      if (!coordinate) {
        return null;
      }

      const tags = element.tags ?? {};
      // Calculamos la distancia entre el usuario y el restaurante.
      const distanceMeters = getDistanceMeters(
        latitude,
        longitude,
        coordinate.latitude,
        coordinate.longitude
      );

      return {
        id: String(element.id),
        name: tags.name?.trim() || 'Unnamed restaurant',
        cuisine: getCuisineLabel(tags.cuisine),
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        distanceMeters,
        address: getAddress(tags),
        isOpenLabel: getOpenLabel(tags.opening_hours),
        phone: tags.phone,
        website: tags.website,
      };
    })
    // Quitamos los elementos nulos que se descartaron antes.
    .filter((restaurant): restaurant is Restaurant => Boolean(restaurant))
    // Ordenamos del restaurante mas cercano al mas lejano.
    .sort((first, second) => first.distanceMeters - second.distanceMeters)
    // Nos quedamos solo con los primeros resultados.
    .slice(0, MAX_RESULTS);

  // Devolvemos la lista final lista para mostrarse en pantalla.
  return restaurants;
}
