// app/routes/home.tsx
import { json } from '@remix-run/node'
import type{ LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { Layout } from '~/components/layout'
import { getOtherUsers } from '~/utils/user.server'
import { UserPanel } from '~/components/user-panel'
import { useLoaderData,  Outlet
} from '@remix-run/react'

// This is the parent of any components in the home folder, 
// Remix will recognize any files in the new home folder as sub-routes of /home




export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const users = await getOtherUsers(userId)
  return json({ users })
}

export default function Home() {
  const { users } = useLoaderData()
  return (
    <Layout>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={users} />
        <div className="flex-1"></div>
      </div>
    </Layout>
  )
}
// ...