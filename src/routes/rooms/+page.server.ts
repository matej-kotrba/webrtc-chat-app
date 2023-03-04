import type { Action, Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { firestore } from "../../config/firebase"
import { collection, where, query, getDocs } from 'firebase/firestore';

const redirectToRoom: Action = async ({ request }) => {


  const room = (await request.formData()).get('roomName');

  const rooms = collection(firestore, "rooms")
  const q = query(rooms, where("title", ">=", room), where("title", "<=", room + "\uf8ff"))

  const docs = (await getDocs(q)).docs

  if (docs.length === 0) {
    return {
      error: "No rooms found",
    }
  }

  return {
    status: 200,
    body: {
      rooms: docs.map((doc) => doc.data())
    }
  }
  // throw redirect(302, `/rooms/${room}`);
};

export const actions: Actions = {
  redirectToRoom: redirectToRoom
};
