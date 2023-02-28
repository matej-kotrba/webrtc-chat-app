import type { ServerLoad } from "@sveltejs/kit";
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { error } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
  const room = params.roomName

  const rooms = collection(firestore, "rooms")
  const q = query(rooms, where("title", "==", room))

  const doc = (await getDocs(q)).docs[0]

  if (!doc) {
    error(404, "It seems that room doesn't exist 😕")
  }
  return {
    roomName: params.roomName as string,
    roomId: doc.id as string
  }
}