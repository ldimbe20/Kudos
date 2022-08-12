// app/utils/auth.server.ts
// app/utils/auth.server.ts

import type { RegisterForm, LoginForm } from './types.server'
import { prisma } from './prisma.server'
import { json, createCookieSessionStorage, redirect } from '@remix-run/node'
import { createUser } from './user.server'
import bcrypt from 'bcryptjs'



export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({ where: { email: user.email } })
// !The count function was used here becuase it returns a numeric value. If there are
//  !no records matching the query, it will return 0 which evaluates to false. Otherwise,
// !a value greater than 0 will be returned which evaluates to true
  
  if (exists) {
    return json({ error: `User already exists with that email` }, { status: 400 })
  }

  const newUser = await createUser(user)
  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 },
    )
  }
  return createUserSession(newUser.id, '/');
}



export async function login({ email, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: { email },
  })
 // queries for user with email
  if (!user || !(await bcrypt.compare(password, user.password)))
    return json({ error: `Incorrect login` }, { status: 400 })
// if not user exist returns null or 400 status
return createUserSession(user.id, "/");
// if email is found info is passed
}


const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'kudos-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})


export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession()
    // creates a session
    session.set('userId', userId)
    // sets the userId for that session
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    // redirects user to a route, commits the session when setting the cookie header
    })
  }