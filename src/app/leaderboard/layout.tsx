import React from 'react'

export default function LeaderboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="px-2 py-4">{children}</div>
}
