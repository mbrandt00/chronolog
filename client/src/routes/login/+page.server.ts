import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
export const actions = {
	OAuth2: async ({ cookies }) => {
		const redirectURL = 'http://localhost:3000/oauth';

		const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL);
		const authToken = cookies.get('authToken');
		console.log(authToken);
		if (authToken) {
			console.log('yes auth token');
			throw redirect(302, '/');
		}
		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile  openid email',
			prompt: 'consent'
		});
		throw redirect(302, authorizeUrl);

		// Generate the url that will be used for the consent dialog.
	}
};
