import { error, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/session';
import { getProfile, getToken } from '$lib/server/auth0';

export async function GET({ cookies, url }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const redirectUri = `${url.origin}/api/auth/callback`;

	if (!code) {
		throw error(400, 'Missing code');
	}

	const savedState = cookies.get('state');
    console.log('Returned state from query:', state);
	cookies.delete('state', { path: '/' });
	if (!state || !savedState || state !== savedState) {
		throw error(400, 'state mismatch');
	}

	let auth0Token, sub, email;
	try {
		auth0Token = await getToken(code, redirectUri);
		const profile = await getProfile(auth0Token);
		sub = profile.sub;
		email = profile.email;
	} catch (err) {
		console.error('Auth0 Error:', err);
		throw error(500, 'Authentication failed');
	}

	const sessionId = await createSession({ auth0Token, userId: sub, email });
	cookies.set('svelte_ec_session', sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production'
	});

	throw redirect(303, '/products/svelte-book');
}
