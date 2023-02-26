import type { ServerLoad } from "@sveltejs/kit";
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { redirect } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
  const rooms = collection(firestore, "rooms")
  const q = query(rooms, where("title", "==", params.roomName))

  const doc = (await getDocs(q)).docs[0]

  if (!doc) {
    console.log("Room not found")
    throw redirect(302, "/")
  }

  return {
    roomName: params.roomName as string,
    roomId: doc.id as string
  }
}