export async function load({ locals }) {
	let authedUser = undefined;
	if (locals.authedUser) {
		authedUser = locals.authedUser;
	} else {
		authedUser = undefined;
	}

	return { authedUser };
}
