import type { ServerLoad } from "@sveltejs/kit";
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { redirect } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
  return {
    roomName: params.roomName as string,
    roomId: doc.id as string
  }
}