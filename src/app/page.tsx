import Header from '@/components/header'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			<Button variant="secondary" size="icon">
				Press Me
			</Button>
		</main>
	)
}
