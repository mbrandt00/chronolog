import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
export const GET = async ({ url, cookies }) => {
	const redirectURL = 'http://localhost:3000/oauth';
	const code = url.searchParams.get('code');
	try {
		const authClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL);

		if (code !== null) {
			const r = await authClient.getToken(code);
			authClient.setCredentials(r.tokens);
			const user: OAuth2Client['credentials'] = authClient.credentials;

			if (!user.access_token) {
				throw new Error('Access token is missing.');
			}

			// Save the access token to a cookie
			cookies.set('authToken', user.access_token, {
				httpOnly: true,
				maxAge: 60 * 60 * 24,
				sameSite: 'strict'
			});

			// Check if a refresh token exists and save it to a separate cookie
			if (user.refresh_token) {
				cookies.set('refreshToken', user.refresh_token, {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 30, // Adjust the expiration time as needed
					sameSite: 'strict'
				});
			}
		} else {
			throw new Error('Access token is missing.');
		}
	} catch (err) {
		console.error('Error logging in with OAuth2 user', err);
	}
	throw redirect(303, '/');
};
