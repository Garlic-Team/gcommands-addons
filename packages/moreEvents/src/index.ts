import { Plugin, registerDirectory } from 'gcommands';
import * as path from 'path';

declare module 'discord.js' {
    export interface ClientEvnets {
        selectMenu: [SelectMenuInteraction];
        clickButton: [ButtonInteraction];
    
        guildBoostLevelUp: [Guild, Number, Number];
        guildBoostLevelDown: [Guild, Number, Number];
        guildRegionUpdate: [Guild, string, string];
        guildBannerUpdate: [Guild, string, string];
        guildAfkChannelUpdate: [Guild, Channel, Channel];
        guildVanityURLUpdate: [Guild, string, string];
        guildFeaturesUpdate: [Guild, object, object];
        guildAcronymUpdate: [Guild, string, string];
        guildOwnerUpdate: [Guild, GuildMember, GuildMember];
        guildMaximumMembersUpdate: [Guild, Number, Number];
        guildPartnerUpdate: [Guild, Boolean, Boolean];
        guildVerifyUpdate: [Guild, Boolean, Boolean];
    
        threadStateUpdate: [ThreadChannel, ThreadChannel];
        threadNameUpdate: [ThreadChannel, string, string];
        threadLockStateUpdate: [ThreadChannel, ThreadChannel];
        threadRateLimitPerUserUpdate: [ThreadChannel, Number, Number];
        threadAutoArchiveDurationUpdate: [ThreadChannel, Number, Number];
    
        voiceChannelJoin: [Channel, VoiceState];
        voiceChannelLeave: [Channel, VoiceState];
        voiceChannelSwitch: [Channel, Channel, VoiceState];
        voiceChannelMute: [Channel, string];
        voiceChannelUnmute: [Channel, string];
        voiceChannelDeaf: [Channel, string];
        voiceChannelUndeaf: [Channel, string];
        voiceStreamingStart: [Channel, Channel];
        voiceStreamingStop: [Channel, Channel];
    
        guildMemberNicknameUpdate: [GuildMember, string, string];
        guildMemberAcceptShipScreening: [GuildMember];
        guildMemberBoost: [GuildMember, Number, Number];
        guildMemberUnboost: [GuildMember, Number, Number];
    
        userAvatarUpdate: [GuildMember, string, string];
        userUsernameUpdate: [GuildMember, string, string];
        userDiscriminatorUpdate: [GuildMember, string, string];
        userFlagsUpdate: [GuildMember, string, string];
    
        rolePositionUpdate: [GuildMember, Number, Number];
        rolePermissionsUpdate: [GuildMember, Number, Number];
    }
}

new Plugin('moreEvents', () => {
    registerDirectory(path.join(__dirname, 'listeners'));
})