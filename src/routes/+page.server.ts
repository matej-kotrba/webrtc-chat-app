import type { Action, Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const redirectToRoom: Action = async ({ request }) => {
	const room = (await request.formData()).get('room');

	throw redirect(302, `/room/${room}`);
};

export const actions: Actions = {
	redirectToRoom: redirectToRoom
};
