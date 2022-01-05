<div align="center">
    <h1>GCommands Plugin MoreEvents</h1>
    <h3>Official plugin for GCommands</h3>
</div>

---

## Installation

Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/):

```sh
npm install gcommands-plugin-moreevents
yarn add gcommands-plugin-moreevents
pnpm add gcommands-plugin-moreevents
```

```js
const { Plugins } = require('gcommands');
require('gcommands-plugin-moreevents');

Plugins.search(__dirname)
```

Now when you create a listener, more events will show up.

List of events:
- selectMenu
- clickButton

- guildBoostLevelUp
- guildBoostLevelDown
- guildRegionUpdate
- guildBannerUpdate
- guildAfkChannelUpdate
- guildVanityURLUpdate
- guildFeaturesUpdate
- guildAcronymUpdate
- guildOwnerUpdate
- guildMaximumMembersUpdate
- guildPartnerUpdate
- guildVerifyUpdate

- threadStateUpdate
- threadNameUpdate
- threadLockStateUpdate
- threadRateLimitPerUserUpdate
- threadAutoArchiveDurationUpdate

- voiceChannelJoin
- voiceChannelLeave
- voiceChannelSwitch
- voiceChannelMute
- voiceChannelUnmute
- voiceChannelDeaf
- voiceChannelUndeaf
- voiceStreamingStart
- voiceStreamingStop

- guildMemberNicknameUpdate
- guildMemberAcceptShipScreening
- guildMemberBoost
- guildMemberUnboost

- userAvatarUpdate
- userUsernameUpdate
- userDiscriminatorUpdate
- userFlagsUpdate
- userBannerUpdate

- rolePositionUpdate
- rolePermissionsUpdate