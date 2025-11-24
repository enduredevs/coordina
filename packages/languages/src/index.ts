import { languages } from "./languages";

export type SupportedLocale = keyof typeof languages;
export const supportedLanguages = Object.keys(languages);
export const defaultLocale = "en";
export default languages;
export { languages };
