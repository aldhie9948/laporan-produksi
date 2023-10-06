import { writable } from "svelte/store";
import type { SelectItem } from "./types";

export const selectedPlan = writable<SelectItem>();
