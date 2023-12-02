import { z } from 'zod';

export const PersonSchema = z.object({
    fullname: z.string().min(5),
    email: z.string().email(),
});
