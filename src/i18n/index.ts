import { tr } from "./tr";
import { en } from "./en";

export type Lang = "tr" | "en";
export type Translations = typeof tr;

export const translations: Record<Lang, Translations> = { tr, en };
export const LANGS: Lang[] = ["tr", "en"];
