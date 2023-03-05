import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

  if (event.url.pathname.startsWith("/rooms")) {
    if (!event.cookies.get("userId")) {
      throw redirect(302, "/");
    }
  }

  return resolve(event);
}