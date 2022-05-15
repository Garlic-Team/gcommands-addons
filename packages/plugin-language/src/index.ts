import { readFileSync } from 'fs';
import { Plugin } from 'gcommands';

declare module 'gcommands' {
	interface GClient {
		__lang__: {
			defaultLanguage?: string;
			languageText?: object;
		};
	}
}

export type language =
	| 'en-GB'
	| 'en-US'
	| 'da'
	| 'de'
	| 'es-ES'
	| 'fr'
	| 'hr'
	| 'it'
	| 'lt'
	| 'hu'
	| 'nl'
	| 'no'
	| 'pl'
	| 'pt-BR'
	| 'ro'
	| 'fi'
	| 'sv-SE'
	| 'vi'
	| 'tr'
	| 'cs'
	| 'el'
	| 'bg'
	| 'ru'
	| 'uk'
	| 'hi'
	| 'th'
	| 'zh-CN'
	| 'ja'
	| 'zh-TW'
	| 'ko';

export interface PluginLanguageOptions {
	defaultLanguage: language;
	languageText: object;
}

export default (options: PluginLanguageOptions) => {
	const defaultLanguage = options.defaultLanguage;
	const languageText = options.languageText;

	new Plugin('@gcommands/plugin-language', (client) => {
		Object.defineProperty(client, '__lang__', {
			value: {
				defaultLanguage: defaultLanguage,
				languageText: languageText || JSON.parse(readFileSync(`${__dirname}/responses.json`, 'utf-8')),
			},
			writable: false,
		});
	});
};

export * from './utils/LanguageManager';
export * as i18n from './utils/LanguageManager';
