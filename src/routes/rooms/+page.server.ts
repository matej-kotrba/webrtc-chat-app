import { redirect, type Action, type Actions, fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { firestore } from '../../config/firebase';
import { firestore as firestoreAdmin } from "../../config/firebase-admin"
import { collection, query, where, getDocs, doc, getDoc, limit } from "firebase/firestore"
import { z } from "zod"

// TODO: Add pagination
const findRooms: Action = async ({ request }) => {
  const room = (await request.formData()).get('roomName');

  const rooms = collection(firestore, "rooms")
  const q = query(rooms, where("title", ">=", room), where("title", "<=", room + "\uf8ff"), limit(10))

  const docs = (await getDocs(q)).docs

  if (docs.length === 0) {
    return {
      error: "No rooms found",
    }
  }

  return {
    status: 200,
    body: {
      rooms: docs.map((doc) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = doc.data()
        return { ...rest, id: doc.id }
      }
      ) as { title: string; hasPassword: boolean, id: string }[] || []
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
      hasPassword: !!result.password,
      password: result.password
    })
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

const checkPassword: Action = async ({ request }) => {
  const formData = await request.formData()
  const password = formData.get("password")
  const roomId = formData.get("roomId")

  if (!password || !roomId) throw error(400, "Bad request")

  const room = await getDoc(doc(firestore, "rooms", roomId as string))

  if (!room.exists()) throw error(404, "Room not found")

  const { password: passw } = await room.data()
  const id = room.id

  if (passw !== password) {
    return fail(400, {
      passwordError: "Yikes! Wrong password."
    })
  }

  throw redirect(302, `/rooms/${id}`)
}

export const actions: Actions = {
  findRooms,
  createRoom,
  checkPassword
};
