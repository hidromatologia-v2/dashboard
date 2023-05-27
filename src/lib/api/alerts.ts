import { DefaultConfig } from '$lib/config/config';
import {
	BadRequestError,
	UnauthorizedError,
	UnknownStatusCode,
	type Filter,
	type Results,
	type ServerResponse
} from './utils';

export enum Condition {
	Lt = '<',
	Gt = '>',
	Le = '<=',
	Ge = '>='
}

export interface Alert {
	uuid?: string;
	name?: string;
	sensorUUID?: string;
	condition?: Condition;
	value?: number;
	enabled?: boolean;
}

export async function searchAlerts(
	session: string,
	filter: Filter<Alert>
): Promise<Results<Alert>> {
	const r: Response = await fetch(`${DefaultConfig.baseURL}/alert`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${btoa(session)}`
		},
		body: JSON.stringify(filter)
	});
	let response: ServerResponse;
	let results: Results<Alert>;
	switch (r.status) {
		case 200:
			results = await r.json();
			return results;
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

export async function createAlert(session: string, alert: Alert): Promise<void> {
    console.log(alert);
    console.log(session);
    console.log(btoa(session))
	const r: Response = await fetch(`${DefaultConfig.baseURL}/alert`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${btoa(session)}`
		},
		body: JSON.stringify(alert)
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
