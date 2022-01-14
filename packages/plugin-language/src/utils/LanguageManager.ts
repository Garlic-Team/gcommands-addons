import { CommandInteraction, ContextMenuInteraction } from 'discord.js';
import { readFileSync } from 'fs';

export class LanguageManager {
    languageText: object;
    defaultLanguage: string;

    constructor() {
        this.languageText = {};
        this.defaultLanguage = '';
    }

    public static __(i: CommandInteraction | ContextMenuInteraction, name: string) {
        const language = i?.locale || i?.guildLocale;
        
        return LanguageManager.getLanguage(language, name);
    }

    private static getLanguage(language: string, name: string) {
        const json = JSON.parse(readFileSync(`${__dirname}/../responses.json`, 'utf-8'));

        return json[language][name];
    }
}