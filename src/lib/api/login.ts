import { DefaultConfig } from '$lib/config/config';
import {
	BadRequestError,
	UnauthorizedError,
	UnknownStatusCode,
	type ServerResponse
} from './utils';

interface Login {
	username: string;
	password: string;
}

export async function login(username: string, password: string): Promise<string> {
	const form: Login = { username, password };
	const r: Response = await fetch(`${DefaultConfig.baseURL}/login`, {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(form)
	});
	let response: ServerResponse;
	switch (r.status) {
		case 201: // Login succeed
			response = await r.json();
			return response.message;
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
