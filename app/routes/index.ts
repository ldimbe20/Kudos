// app/routes/index.ts
import {  redirect } from '@remix-run/node'
import type { LoaderFunction,  } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return redirect('/home')
}


//  this is a resource route A resource route is a route that does not render a component, but can instead respond with any type of response. Think of it as a simple API endpoint. 
//In your / route's case, you will want it to return a redirect response with a 302 status code.

// this file was changed to .ts because it will never render a component, it will only be used to reroute