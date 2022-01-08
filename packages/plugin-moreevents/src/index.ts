import { Plugin, registerDirectory } from 'gcommands';
import * as path from 'path';

declare module 'discord.js' {
    type VoiceChannelMuteType = 'self-muted' | 'server-muted';
    type VoiceChannelDeafType = 'self-deafened' | 'server-deafened';

    interface ClientEvents {
        selectMenu: [SelectMenuInteraction];
        clickButton: [ButtonInteraction];
    
        guildBoostLevelUp: [Guild, number, number];
        guildBoostLevelDown: [Guild, number, number];
        guildRegionUpdate: [Guild, string, string];
        guildBannerUpdate: [Guild, string, string];
        guildAfkChannelUpdate: [Guild, Channel, Channel];
        guildVanityURLUpdate: [Guild, string, string];
        guildFeaturesUpdate: [Guild, object, object];
        guildAcronymUpdate: [Guild, string, string];
        guildOwnerUpdate: [Guild, GuildMember, GuildMember];
        guildMaximumMembersUpdate: [Guild, number, number];
        guildPartnerUpdate: [Guild, boolean, boolean];
        guildVerifyUpdate: [Guild, boolean, boolean];
    
        threadStateUpdate: [ThreadChannel, ThreadChannel];
        threadNameUpdate: [ThreadChannel, string, string];
        threadLockStateUpdate: [ThreadChannel, ThreadChannel];
        threadRateLimitPerUserUpdate: [ThreadChannel, number, number];
        threadAutoArchiveDurationUpdate: [ThreadChannel, number, number];
    
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
        guildMemberBoost: [GuildMember, number, number];
        guildMemberUnboost: [GuildMember, number, number];
        guildMemberTimeoutAdded: [GuildMember, Date, Date];
        guildMemberTimeoutChanged: [GuildMember, Date, Date];
        guildMemberTimeoutRemoved: [GuildMember, Date, Date];
    
        userAvatarUpdate: [User, string, string];
        userUsernameUpdate: [User, string, string];
        userDiscriminatorUpdate: [User, string, string];
        userFlagsUpdate: [User, Readonly<UserFlags>, Readonly<UserFlags>];
        userBannerUpdate: [User, string, string];
    
        rolePositionUpdate: [Role, number, number];
        rolePermissionsUpdate: [Role, number, number];
    }
}

new Plugin('@gcommands/plugin-moreevents', () => {
	registerDirectory(path.join(__dirname, 'listeners'));
});