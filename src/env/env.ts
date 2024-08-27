/* eslint-disable prettier/prettier */
import {z} from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3001),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACESS_KEY_ID: z.string(),
  AWS_ACESS_KEY_SECRET: z.string(),
})

// Inferindo ao Env o tipo envSchmea
export type Env = z.infer<typeof envSchema>