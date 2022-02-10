<div align="center">
    
   # <img src="https://cdn.discordapp.com/avatars/834822955229380619/7d0142158babe0375e7cc633e87c06d4.png" height="30"> GCommands Plugin More Events
   ### Official plugin for GCommands
    
  <br />
  <p>
    <a href="https://www.npmjs.com/package/@gcommands/plugin-language"><img src="https://nodei.co/npm/@gcommands/plugin-language.png?downloads=true&stars=true" alt="NPM Banner"></a>
    <br />
    <a href="https://discord.gg/AjKJSBbGm2"><img src="https://discord.com/api/guilds/833628077556367411/embed.png?style=banner2" /></a>
  </p>
  <p>
    <a href="https://ko-fi.com/H2H05FNRL"><img src="https://img.shields.io/badge/Kofi-Donate-yellow?style=for-the-badge" height="30" /></a>
    <a href="https://github.com/Garlic-Team/gcommands-addons"><img src="https://img.shields.io/badge/Open-Source-blue?style=for-the-badge" height="30" /></a>
    <img src="https://img.shields.io/badge/Made%20With-TypeScript-red?style=for-the-badge" height="30" />
  </p>
</div>

---

## Installation

Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/):

```sh
npm install @gcommands/plugin-language
yarn add @gcommands/plugin-language
pnpm add @gcommands/plugin-language
```

```js
// index.js
const { Plugins } = require('gcommands');
const { readFileSync } = require('fs');

require('@gcommands/plugin-language').default({
  defaultLanguage: 'en-GB',
  languageText: JSON.parse(readFileSync(`${__dirname}/responses.json`, 'utf-8'))
});

Plugins.search(__dirname);

// ERROR, COOLDOWN, NOT_FOUND are default in GCommands (you can change it via plugin-language)

// responses.json
{
  "en-GB": {
    "hello": "Hello!",
    "ERROR": "Broken :(",
    "COOLDOWN": "You need wait {duration} for {name}",
    "NOT_FOUND": "Undefined command"
  },
  "en-US": {
    "hello": "Hello!",
    "ERROR": "Broken :(",
    "COOLDOWN": "You need wait {duration} for {name}",
    "NOT_FOUND": "Undefined command"
  },
  "da": {
    "hello": "Hej"
  },
  "de": {
    "hello": "Hallo"
  },
  "es-ES": {

  },
  "fr": {

  },
  "hr": {

  },
  "it": {
      
  },
  "lt": {

  },
  "hu": {

  },
  "nl": {

  },
  "no": {
      
  },
  "pl": {

  },
  "pt-BR": {

  },
  "ro": {
      
  },
  "fi": {

  },
  "sv-SE": {

  },
  "vi": {

  },
  "tr": {

  },
  "cs": {

  },
  "el": {

  },
  "bg": {

  },
  "ru": {
      
  },
  "uk": {

  },
  "hi": {

  },
  "th": {

  },
  "zh-CN": {

  },
  "ja": {

  },
  "zh-TW": {

  },
  "ko": {
      
  }
}
// ^ 

// command.js
const { Command } = require('gcommands');
const { LanguageManager } = require('@gcommands/plugin-language');

new Command({
  run: (ctx) => {
    const hello = LanguageManager.__(ctx.interaction, 'hello');

    ctx.reply({
      content: hello
    });
  }
})
```