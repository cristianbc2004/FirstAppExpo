import { z } from 'zod';

const citySchema = z.object({
  city: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters.')
    .max(80, 'Please keep the city name under 80 characters.')
    .regex(/^[\p{L}\s-]+$/u, 'Use letters, spaces, and hyphens only.'),
});

type CitySchema = z.infer<typeof citySchema>;

export { citySchema };
export type { CitySchema };