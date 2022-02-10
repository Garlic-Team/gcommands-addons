import { Client, Interaction } from 'discord.js';
import { GClient } from 'gcommands';

export class LanguageManager {
    public static __(i: { client: Client | GClient, locale?: string, guildLocale?: string } | Interaction, name: string) {
        const client = i.client as GClient;
        const language = i?.locale || i?.guildLocale || client.__lang__.defaultLanguage;
        
        return LanguageManager.getLanguage(client.__lang__, language, name);
    }

    private static getLanguage(lang: { defaultLanguage?: string; languageText?: object; }, language: string, name: string) {
        const json = lang?.languageText;

        if (json[language][name]) return json[language][name];
        else return json[lang.defaultLanguage][name];
    }
}