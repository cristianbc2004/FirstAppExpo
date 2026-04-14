import { Restaurant } from '@/types/restaurant';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type RestaurantsContextValue = {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
};

const RestaurantsContext = createContext<RestaurantsContextValue | null>(null);

export function RestaurantsProvider({ children }: PropsWithChildren) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
}

export function useRestaurants() {
  const context = useContext(RestaurantsContext);

  if (!context) {
    throw new Error('useRestaurants must be used inside RestaurantsProvider.');
  }

  return context;
}
