import { DefaultConfig } from '$lib/config/config';
import {
	type ServerResponse,
	BadRequestError,
	UnauthorizedError,
	UnknownStatusCode
} from '$lib/api/utils';

export interface Account {
	uuid?: string;
	username?: string;
	password?: string;
	name?: string;
	phone?: string;
	email?: string;
	confirmed?: boolean;
}

export async function accountDetails(session: string): Promise<Account> {
	const r: Response = await fetch(`${DefaultConfig.baseURL}/account`, {
		headers: {
			Authorization: `Bearer ${btoa(session)}`
		}
	});
	let response: ServerResponse;
	let account: Account;
	switch (r.status) {
		case 200: // Login succeed
			account = await r.json();
			return account;
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

export interface UpdateRequest {
	user: Account,
	oldPassword: string
}

export async function updateAccountDetails(session: string, form: UpdateRequest): Promise<void> {
	const r: Response = await fetch(`${DefaultConfig.baseURL}/account`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${btoa(session)}`
		},
		body: JSON.stringify(form)
	});
	let response: ServerResponse;
	switch (r.status) {
		case 200: // Login succeed
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
