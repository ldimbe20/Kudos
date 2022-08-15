// app/routes/home/kudo.$userId.tsx
import { json, redirect } from '@remix-run/node'
import type{ LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserById } from '~/utils/user.server'


// ! the route to this file is home/kudo/$userId this component is a child of home, but by using .kudo in
// !the name of file it add another path directory

// 1
export const loader: LoaderFunction = async ({   params }) => {
    const { userId } = params
  
    if (typeof userId !== 'string') {
      return redirect('/home')
    }
  
    const recipient = await getUserById(userId)
    return json({ recipient })
  }

export default function KudoModal() {
  const { recipient } = useLoaderData()
  // 3
 
  return <h2> User: {recipient.profile.firstName} {recipient.profile.lastName}</h2>
}

