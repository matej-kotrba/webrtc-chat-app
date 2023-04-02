import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = (async ({ cookies, request }) => {
  const { id } = (await request.json())
  console.log(id)
  if (!id) {
    cookies.set("userId", "", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    })
    // cookies.delete("userId", { path: "/" })
    return new Response("Logged out", { status: 200 })
  }
  cookies.set("userId", id, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  })
  return new Response("Logged in", { status: 200 })
})