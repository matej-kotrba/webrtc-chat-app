import type { PageLoad } from "./$types";
import { collection, doc, getDoc } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  const id = params.roomId

  const rooms = collection(firestore, "rooms")
  const q = doc(rooms, id)//query(rooms, where("id", "==", id))

  const docData = (await getDoc(q)).data()

  if (!docData) {
    throw error(404, "It seems that this room doesn't exist 😕")
  }
  return {
    roomName: docData.title as string,
    roomId: id as string
  }
}