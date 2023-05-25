import { writable } from 'svelte/store';
import { browser } from "$app/environment";


const themeKey: string = 'theme';
const storedTheme: string | null = browser? localStorage.getItem(themeKey) : null;

export enum Theme {
	Light = 'light',
	Dark = 'dark'
}

export const theme = writable(storedTheme === null ? Theme.Light : storedTheme);
theme.subscribe((value) => {
	if (browser) localStorage.setItem(themeKey, value === Theme.Dark ? Theme.Dark : Theme.Light);
});
