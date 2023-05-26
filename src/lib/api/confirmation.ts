import { DefaultConfig } from '$lib/config/config';
import {
	BadRequestError,
	UnauthorizedError,
	type ServerResponse,
	UnknownStatusCode
} from '$lib/api/utils';

export async function requestAccountConfirmation(session: string): Promise<void> {
	const r: Response = await fetch(`${DefaultConfig.baseURL}/confirm/account`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${btoa(session)}`
		}
	});
	let response: ServerResponse;
	switch (r.status) {
		case 201:
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

export async function confirmAccount(confirmCode: string): Promise<void> {
	const r: Response = await fetch(`${DefaultConfig.baseURL}/confirm/account`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			confirmCode
		})
	});
	let response: ServerResponse;
	switch (r.status) {
		case 201:
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
