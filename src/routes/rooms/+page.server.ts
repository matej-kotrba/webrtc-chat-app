import type { Action, Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { firestore } from "../../config/firebase"
import { collection, where, query, getDocs } from 'firebase/firestore';

const redirectToRoom: Action = async ({ request }) => {


  const room = (await request.formData()).get('roomName');

  const rooms = collection(firestore, "rooms")
  const q = query(rooms, where("title", "==", room))

  const doc = (await getDocs(q)).docs[0]

  if (!doc) {
    return {
      error: "Room not found",
    }
  }


  throw redirect(302, `/rooms/${room}`);
};

export const actions: Actions = {
  redirectToRoom: redirectToRoom
};
