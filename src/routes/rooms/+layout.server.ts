import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ cookies }) => {
  if (!cookies.get("userId")) {
    throw redirect(302, "/");
  }
}