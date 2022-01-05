import { Plugin, registerDirectory } from 'gcommands';
import * as path from 'path';

declare module 'discord.js' {
    type VoiceChannelMuteType = 'self-muted' | 'server-muted';
    type VoiceChannelDeafType = 'self-deafened' | 'server-deafened';

    interface ClientEvents {
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
    
        voiceChannelJoin: [GuildMember, VoiceChannel];
        voiceChannelLeave: [GuildMember, VoiceChannel];
        voiceChannelSwitch: [GuildMember, VoiceChannel, VoiceChannel];
        voiceChannelMute: [GuildMember, VoiceChannelMuteType];
        voiceChannelUnmute: [GuildMember, VoiceChannelMuteType];
        voiceChannelDeaf: [GuildMember, VoiceChannelDeafType];
        voiceChannelUndeaf: [GuildMember, VoiceChannelDeafType];
        voiceStreamingStart: [GuildMember, VoiceChannel];
        voiceStreamingStop: [GuildMember, VoiceChannel];
    
        guildMemberNicknameUpdate: [GuildMember, string, string];
        guildMemberAcceptShipScreening: [GuildMember];
        guildMemberBoost: [GuildMember, Number, Number];
        guildMemberUnboost: [GuildMember, Number, Number];
    
        userAvatarUpdate: [User, string, string];
        userUsernameUpdate: [User, string, string];
        userDiscriminatorUpdate: [User, string, string];
        userFlagsUpdate: [User, Readonly<UserFlags>, Readonly<UserFlags>];
        userBannerUpdate: [User, string, string];
    
        rolePositionUpdate: [Role, Number, Number];
        rolePermissionsUpdate: [Role, Number, Number];
    }
}

new Plugin('moreEvents', () => {
    registerDirectory(path.join(__dirname, 'listeners'));
})