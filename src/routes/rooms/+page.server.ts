import type { Action, Actions } from '@sveltejs/kit';
import { firestore } from "../../config/firebase"
import { collection, addDoc, where, getDocs, query } from 'firebase/firestore';

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
      rooms: docs.map((doc) => doc.data()) || []
    }
  }
  // throw redirect(302, `/rooms/${room}`);
};

const createRoom: Action = async ({ request }) => {
  const formData = await request.formData()
  const room = formData.get('roomName')

  const rooms = collection(firestore, "rooms")
  addDoc(rooms, {
    title: room,
  })
}

export const actions: Actions = {
  redirectToRoom,
  createRoom
};
