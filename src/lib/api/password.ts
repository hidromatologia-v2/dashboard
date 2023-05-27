import { DefaultConfig } from "$lib/config/config";
import { BadRequestError, UnauthorizedError, UnknownStatusCode, type ServerResponse } from "./utils";

export async function requestPasswordReset(email: string): Promise<void> {
    const r: Response = await fetch(`${DefaultConfig.baseURL}/reset/password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email})
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

export async function resetPassword(resetCode: string, newPassword: string): Promise<void> {
    const r: Response = await fetch(`${DefaultConfig.baseURL}/reset/password`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({resetCode, newPassword})
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