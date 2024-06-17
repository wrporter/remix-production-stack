import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z
		.union([
			z.literal('development'),
			z.literal('test'),
			z.literal('production'),
		])
		.default('development'),
	DATABASE_URL: z.string().trim().url(),
})

export type Environment = z.infer<typeof envSchema>
export const env: Environment = envSchema.parse(process.env)
