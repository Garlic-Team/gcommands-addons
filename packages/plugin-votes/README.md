<div align="center">
    <h1>GCommands Plugin MoreEvents</h1>
    <h3>Official plugin for GCommands</h3>
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
const { LruCacheProvider } = require('gcommands/dist/providers/LruCache');

const client = new GClient({
    database: new LruCacheProvider({ max: 200, maxAge: 3600000 });
})

require('@gcommands/plugin-votes')({
    type: 'TOP.GG',
    dblToken: 'your top.gg authorization token',
    webhookToken: 'random token for webhook',
    database: client.getDatabase(LruCacheProvider.prototype)
})

Plugins.search(__dirname)

// command.js
const { Comamnd } = require('gcommands');
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