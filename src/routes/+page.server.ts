import type { Action, Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../config/firebase"

const redirectToRoom: Action = async ({ request }) => {
	console.log(Date.now())
	const room = (await request.formData()).get('roomName');

	const rooms = collection(firestore, "rooms")
	const q = query(rooms, where("title", "==", room))

	const doc = (await getDocs(q)).docs[0]

	console.log(Date.now())

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
