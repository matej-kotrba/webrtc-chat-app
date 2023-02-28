import { user } from "../../stores/user"
import { redirect } from "@sveltejs/kit"
import type { Load } from "@sveltejs/kit"

export const load: Load = async () => {
  console.log()
  if (!user) {
    throw redirect(302, "/")
  }
}