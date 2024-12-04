import { clerkMiddleware,  } from '@clerk/nextjs/server'

export default clerkMiddleware({})

export const config = {
  matcher: [
     // Allow "/api/webhooks/clerk" as a public route
     '/((?!api/webhooks/clerk|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
     // Always run for other API routes
     '/(api|trpc)(.*)',
  ],
}