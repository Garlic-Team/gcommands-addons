<div align="center">
    
   # <img src="https://cdn.discordapp.com/avatars/834822955229380619/7d0142158babe0375e7cc633e87c06d4.png" height="30"> GCommands Plugin Votes
   ### Official plugin for GCommands
    
  <br />
  <p>
    <a href="https://www.npmjs.com/package/@gcommands/plugin-votes"><img src="https://nodei.co/npm/@gcommands/plugin-votes.png?downloads=true&stars=true" alt="NPM Banner"></a>
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
npm install @gcommands/plugin-votes
yarn add @gcommands/plugin-votes
pnpm add @gcommands/plugin-votes
```

```js
// index.js / LruCache Provider (recommended)
const { Plugins, GClient } = require('gcommands');
const { LruCacheProvider } = require('gcommands/dist/providers/LruCacheProvider');

const client = new GClient({
    database: new LruCacheProvider({ max: 200, maxAge: 3600000 });
})

require('@gcommands/plugin-votes').default({
    type: 'TOP.GG',
    dblToken: 'your top.gg authorization token',
    webhookToken: 'random token for webhook'
})

Plugins.search(__dirname);

// command.js
const { Command } = require('gcommands');
const { VoteInhibitor } = require('@gcommands/plugin-votes');

new Command({
    inhibitors: [
        new VoteInhibitor({
            message: 'Your message if user must vote'
        })
    ]
    ...params
})
```

![topggimage](https://camo.githubusercontent.com/de589c73a4a72f855b595407134d890551d32b77fdd17b28409815b0c656ee2e/68747470733a2f2f692e696d6775722e636f6d2f77466c703448672e706e67)
