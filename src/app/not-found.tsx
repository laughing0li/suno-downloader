import { BackgroundImage } from '@/components/BackgroundImage'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
// export const dynamic = 'force-dynamic'
export const runtime = 'edge';

export default function NotFound() {
  return (
    <html lang="en" className="h-screen antialiased" suppressHydrationWarning>
      <body className="h-screen">
        <div className="relative flex h-full">
          <BackgroundImage className="absolute inset-0" />
          <Container className="relative z-10 flex w-full flex-col items-center justify-center">
            <p className="font-display text-2xl tracking-tight text-blue-900">
              404
            </p>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-lg tracking-tight text-blue-900">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <Button href="/" className="mt-8">
              Go back home
            </Button>
          </Container>
        </div>
      </body>
    </html>
  )
}
