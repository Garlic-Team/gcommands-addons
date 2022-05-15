import { Plugin, registerDirectory } from 'gcommands';
import * as path from 'path';

declare module 'discord.js' {
	type VoiceChannelMuteType = 'self-muted' | 'server-muted';
	type VoiceChannelDeafType = 'self-deafened' | 'server-deafened';

	interface ClientEvents {
		selectMenu: [SelectMenuInteraction];
		clickButton: [ButtonInteraction];

		guildBoostLevelUp: [Guild, string, string];
		guildBoostLevelDown: [Guild, string, string];
		guildRegionUpdate: [Guild, string, string];
		guildBannerUpdate: [Guild, string, string];
		guildAfkChannelUpdate: [Guild, Channel, Channel];
		guildVanityURLUpdate: [Guild, string, string];
		guildFeaturesUpdate: [Guild, object, object];
		guildAcronymUpdate: [Guild, string, string];
		guildOwnerUpdate: [Guild, string, string];
		guildMaximumMembersUpdate: [Guild, number, number];
		guildPartnerUpdate: [Guild, boolean, boolean];
		guildVerifyUpdate: [Guild, boolean, boolean];

		threadStateUpdate: [ThreadChannel, ThreadChannel];
		threadNameUpdate: [ThreadChannel, string, string];
		threadLockStateUpdate: [ThreadChannel, ThreadChannel];
		threadRateLimitPerUserUpdate: [ThreadChannel, number, number];
		threadAutoArchiveDurationUpdate: [
			ThreadChannel,
			number | string,
			number | string,
		];

		voiceChannelJoin: [GuildMember, VoiceBasedChannel];
		voiceChannelLeave: [GuildMember, VoiceBasedChannel];
		voiceChannelSwitch: [GuildMember, VoiceBasedChannel, VoiceBasedChannel];
		voiceChannelMute: [GuildMember, VoiceChannelMuteType];
		voiceChannelUnmute: [GuildMember, VoiceChannelMuteType];
		voiceChannelDeaf: [GuildMember, VoiceChannelDeafType];
		voiceChannelUndeaf: [GuildMember, VoiceChannelDeafType];
		voiceStreamingStart: [GuildMember, VoiceBasedChannel];
		voiceStreamingStop: [GuildMember, VoiceBasedChannel];

		guildMemberNicknameUpdate: [GuildMember, string, string];
		guildMemberAcceptShipScreening: [GuildMember];
		guildMemberBoost: [GuildMember, Date, Date];
		guildMemberUnboost: [GuildMember, Date, Date];
		guildMemberTimeoutAdded: [GuildMember, Date, Date];
		guildMemberTimeoutChanged: [GuildMember, Date, Date];
		guildMemberTimeoutRemoved: [GuildMember, Date, Date];

		userAvatarUpdate: [User, string, string];
		userUsernameUpdate: [User, string, string];
		userDiscriminatorUpdate: [User, string, string];
		userFlagsUpdate: [User, Readonly<UserFlags>, Readonly<UserFlags>];
		userBannerUpdate: [User, string, string];

		rolePositionUpdate: [Role, number, number];
		rolePermissionsUpdate: [Role, bigint, bigint];
	}
}

new Plugin('@gcommands/plugin-moreevents', () => {
	registerDirectory(path.join(__dirname, 'listeners'));
});
