'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Provider({ children }: { children: ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
