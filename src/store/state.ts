import {writable} from "svelte/store";

export const selectedInput = writable();
export const apiKey = writable("");
export const ephemeral = writable("");