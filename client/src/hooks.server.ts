async function getUserData(access_token) {
	const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;
	const response = await fetch(url);
	return await response.json();
}
export async function handle({ event, resolve }) {
	const authToken = event.cookies.get('authToken');
	event.locals.authedUser = null;
	try {
		if (!authToken) {
			return event.locals;
		} else {
			const user = await getUserData(authToken);
			event.locals.authedUser = user;
		}
	} finally {
		const response = await resolve(event);
		/* eslint-disable no-unsafe-finally */
		return response;
		/* eslint-enable no-unsafe-finally */
	}
}
