// app/routes/home/kudo.$userId.tsx
import { json, redirect } from '@remix-run/node'
import type{ LoaderFunction,  useActionData } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserById } from '~/utils/user.server'
import { Portal } from '~/components/portal'
import { Modal } from '~/components/modal'
import { getUser } from '~/utils/auth.server'
import { useState } from 'react'






// ! the route to this file is home/kudo/$userId this component is a child of home, but by using .kudo in
// !the name of file it add another path directory

// 1
export const loader: LoaderFunction = async ({ request, params }) => {
    const { userId } = params
    const user = await getUser(request)

  
    if (typeof userId !== 'string') {
      return redirect('/home')
    }
  
    const recipient = await getUserById(userId)
    return json({ recipient, user })

  }

export default function KudoModal() {
  
  
  const { recipient } = useLoaderData()
 
  return (  <Portal wrapperId="kudo-modal">
  <Modal isOpen={true} className="w-2/3 p-10">
      <h2> User: {recipient.profile.firstName} {recipient.profile.lastName} </h2>
  </Modal>
  </Portal>)
}

