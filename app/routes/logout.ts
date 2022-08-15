// app/routes/logout.ts
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { logout } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => logout(request);
// grabbing functionality from logout in auth.server
export const loader: LoaderFunction = async () => redirect("/");

//  this is a resource route A resource route is a route that does not render a component, but can instead 
// has an action and a redirect.  this is used in user-panel to signout 
