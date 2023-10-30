// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authedUser: googleData | undefined | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

interface googleData {
	sub?: string;
	name?: string;
	given_name?: string;
	family_name?: string;
	picture?: string;
	email?: string;
	email_verified?: boolean;
	locale?: string;
}

export {};
