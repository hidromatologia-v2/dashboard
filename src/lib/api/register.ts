import { DefaultConfig } from '$lib/config/config';
import {
	BadRequestError,
	UnauthorizedError,
	UnknownStatusCode,
	type ServerResponse
} from '$lib/api/utils';

interface Register {
	username: string;
	password: string;
	name: string;
	phone: string;
	email: string;
}

export async function register(
	username: string,
	password: string,
	name: string,
	phone: string,
	email: string
): Promise<void> {
	const form: Register = {
		username,
		password,
		name,
		phone,
		email
	};
	const r: Response = await fetch(`${DefaultConfig.baseURL}/register`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(form)
	});
	let response: ServerResponse;
	switch (r.status) {
		case 201: // Login succeed
			return;
		case 400:
			throw BadRequestError;
		case 401:
			throw UnauthorizedError;
		case 500:
			response = await r.json();
			throw response.message;
		default:
			throw UnknownStatusCode;
	}
}
