import { writable } from 'svelte/store';
import { browser } from "$app/environment";

const sessionKey: string = 'session';
const storedSession: string | null = browser? localStorage.getItem(sessionKey) : null;

export const session = writable(storedSession === null ? '' : storedSession);
session.subscribe((value: string) => {
	if (browser) localStorage.setItem(sessionKey, value);
});