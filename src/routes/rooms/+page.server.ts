import type { Action, Actions } from '@sveltejs/kit';
import { firestore } from '../../config/firebase';
import { firestore as firestoreAdmin } from "../../config/firebase-admin"
import { collection, query, where, getDocs } from "firebase/firestore"
import { z } from "zod"
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

const roomSchema = z.object({
  roomName: z.string({ required_error: "Room name is required !" })
    .min(4, { message: "Name has to be at least 4 characters long !" })
    .max(20, { message: "Name has to be shorther than 20 characters !" })
    .trim(),
  password: z.union([z.string().length(0), z.string().min(4).max(20)]).optional(),
  confirmPassword: z.union([z.string().length(0), z.string().min(4).max(20)]).optional(),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["password"]
    })
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"]
    })
  }
})

const createRoom: Action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData())

  try {
    const result = roomSchema.parse(formData)


    const rooms = firestoreAdmin.collection("rooms")
    await rooms.add({
      title: result.roomName,
    })
    // const rooms = firestore.collection("rooms")
    // addDoc(rooms, {
    //   title: result.roomName,
    // })
  }
  catch (err: any) {
    const { fieldErrors } = err.flatten()
    const { password, confirmPassword, ...rest } = formData
    console.log(formData)
    console.log(fieldErrors)
    return {
      data: rest,
      errors: fieldErrors
    }
  }

  // const room = formData.get('roomName')

  // const rooms = collection(firestore, "rooms")
  // addDoc(rooms, {
  //   title: room,
  // })
}

export const actions: Actions = {
  redirectToRoom,
  createRoom
};
