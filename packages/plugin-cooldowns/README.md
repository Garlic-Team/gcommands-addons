<div align="center">
    
   # <img src="https://cdn.discordapp.com/avatars/834822955229380619/7d0142158babe0375e7cc633e87c06d4.png" height="30"> GCommands Plugin Cooldowns
   ### Official plugin for GCommands
    
  <br />
  <p>
    <a href="https://www.npmjs.com/package/@gcommands/plugin-cooldowns"><img src="https://nodei.co/npm/@gcommands/plugin-cooldowns.png?downloads=true&stars=true" alt="NPM Banner"></a>
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
npm install @gcommands/plugin-cooldowns
yarn add @gcommands/plugin-cooldowns
pnpm add @gcommands/plugin-cooldowns
```

## Informations

Yes, GCommands already includes built-in support for cooldowns, but only for short periods like 10 seconds, 1 minute. This plugin is used for cooldown for more than an hour, a day because it is stored in the database.

```js
// index.js / LruCache Provider (recommended)
const { Plugins, GClient } = require('gcommands');
const { MongoDBProvider } = require('gcommands/dist/providers/MongoDBProvider');

const client = new GClient({
    database: new MongoDBProvider(process.env.mongodb_uri);
})

Plugins.search(__dirname);

// command.js
const { Command } = require('gcommands');
const { CooldownInhibitor } = require('@gcommands/plugin-cooldowns');

new Command({
    inhibitors: [
        new CooldownInhibitor({
            cooldown: '1d',
            message: 'You need wait {duration} before use.'
        })
    ]
    ...params
})
```