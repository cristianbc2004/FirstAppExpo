// esta parte de codigo lo que hace es buscar los restaurnates mas cercanos que hay en tu ubicacion actual.
import { fetchNearbyRestaurants } from '@/services/restaurant-service';
import { useRestaurants } from '@/context/restaurants-context';
import * as Location from 'expo-location'; // importtante, es la biblioteca que sirve para los permisos.
import { useEffect, useState } from 'react';

type UserLocation = {
  latitude: number;
  longitude: number;
};

export function useNearbyRestaurants() {
  // Obtenemos del contexto la lista global de restaurantes y la funcion para actualizarla.
  const { restaurants, setRestaurants } = useRestaurants();
  // Estado para mostrar carga mientras se piden permisos, ubicacion y datos.
  const [isLoading, setIsLoading] = useState(true);
  // Estado para guardar un mensaje legible si algo falla.
  const [errorMessage, setErrorMessage] = useState('');
  // Guarda la ubicacion actual del usuario para poder mostrarla en pantalla.
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  async function loadRestaurants() {
    // Cada vez que recargamos, activamos loading y limpiamos errores anteriores.
    setIsLoading(true);
    setErrorMessage('');

    try {
      const existingPermission = await Location.getForegroundPermissionsAsync(); // es lo que hace pedir los permisos de ubi
      // Si ya teniamos permisos, los reutilizamos; si no, se le piden al usuario.
      const permission =
        existingPermission.status === 'granted'
          ? existingPermission
          : await Location.requestForegroundPermissionsAsync();

      // Si el usuario no acepta permisos, detenemos el flujo y mostramos error.
      if (permission.status !== 'granted') {
        throw new Error(
          'Location permission is required so we can show restaurants close to you.'
        );
      }

      // Primero intentamos usar la ultima ubicacion conocida porque suele ser mas rapida.
      const lastKnownPosition = await Location.getLastKnownPositionAsync();
      // Si no existe una ubicacion previa, pedimos la ubicacion actual al GPS.
      const currentPosition =
        lastKnownPosition ??
        (await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }));

      // Transformamos la respuesta de Expo Location en un objeto simple con latitud y longitud.
      const nextLocation = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };

      // Guardamos la ubicacion para usarla en la UI.
      setUserLocation(nextLocation);

      // Aqui se hace la busqueda real de restaurantes cercanos usando la ubicacion actual.
      const nextRestaurants = await fetchNearbyRestaurants(
        nextLocation.latitude,
        nextLocation.longitude
      );

      // Si la API responde vacia, lanzamos un error para informar al usuario.
      if (nextRestaurants.length === 0) {
        throw new Error('No restaurants were found nearby. Try refreshing in a busier area.');
      }

      // Si todo sale bien, actualizamos el contexto con los restaurantes encontrados.
      setRestaurants(nextRestaurants);
    } catch (error) {
      // Si algo falla, limpiamos la lista para no dejar datos viejos en pantalla.
      setRestaurants([]);
      // Convertimos el error en un mensaje que la interfaz pueda mostrar.
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while loading nearby restaurants.'
      );
    } finally {
      // Tanto si sale bien como si falla, quitamos el estado de carga al final.
      setIsLoading(false);
    }
  }

  useEffect(() => { // funcion que va ejecutando la logica de esta cada vez que se llama.
    loadRestaurants().catch(() => {
      // Errors are already handled inside loadRestaurants.
    });
  }, []);

  return {
    // Devolvemos todo lo necesario para que la pantalla renderice datos y permita refrescar.
    restaurants,
    isLoading,
    errorMessage,
    refreshRestaurants: loadRestaurants,
    userLocation,
  };
}
