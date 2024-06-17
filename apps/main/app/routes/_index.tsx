import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '#app/utils/db.server.ts'
import { contact } from '#server/db-schema.server.ts'

export const meta: MetaFunction = () => [{ title: 'Home' }]

export async function loader() {
	// await db
	// 	.insert(contact)
	// 	.values({ id: 1, name: 'Wesley Porter', email: 'wesp@test.com' })
	const result = await db.select().from(contact)
	return json(result)
}

export default function Index() {
	const data = useLoaderData()
	return (
		<main>
			<h1>Hello, World!</h1>
			<div>{JSON.stringify(data, null, 4)}</div>
		</main>
	)
}
