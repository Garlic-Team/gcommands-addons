import type { GuildChannel, TextChannel, VoiceChannel } from 'discord.js';
import { Listener } from 'gcommands';

new Listener({
	event: 'channelUpdate',
	name: 'channelUpdate-moreEvents',
	run: (oldChannel, newChannel) => {
		const client = oldChannel.client;

		const guildOldChannel = oldChannel as GuildChannel;
		const guildNewChannel = newChannel as GuildChannel;

		if (
			guildOldChannel.permissionOverwrites !==
			guildOldChannel.permissionOverwrites
		) {
			client.emit(
				'guildChannelPermissionsUpdate',
				newChannel,
				guildOldChannel.permissionOverwrites,
				guildNewChannel.permissionOverwrites,
			);
		}

		if (
			guildOldChannel.type === 'GUILD_TEXT' &&
			(guildOldChannel as TextChannel).topic !==
				(guildNewChannel as TextChannel).topic
		) {
			client.emit(
				'guildChannelTopicUpdate',
				newChannel,
				(guildOldChannel as TextChannel).topic,
				(guildNewChannel as TextChannel).topic,
			);
		}

		if (
			guildOldChannel.type === 'GUILD_TEXT' &&
			(guildOldChannel as TextChannel).nsfw !==
				(guildNewChannel as TextChannel).nsfw
		) {
			client.emit(
				'guildChannelNSFWUpdate',
				newChannel,
				(guildOldChannel as TextChannel).nsfw,
				(guildNewChannel as TextChannel).nsfw,
			);
		}

		if (oldChannel.type !== newChannel.type) {
			client.emit(
				'guildChannelTypeUpdate',
				newChannel,
				oldChannel.type,
				newChannel.type,
			);
		}

		if (
			guildOldChannel.type === 'GUILD_VOICE' &&
			(guildOldChannel as VoiceChannel).userLimit !==
				(guildNewChannel as VoiceChannel).userLimit
		) {
			client.emit(
				'guildChannelUserLimitUpdate',
				newChannel,
				(guildOldChannel as VoiceChannel).userLimit,
				(guildNewChannel as VoiceChannel).userLimit,
			);
		}

		if (
			guildOldChannel.type === 'GUILD_VOICE' &&
			(guildOldChannel as VoiceChannel).bitrate !==
				(guildNewChannel as VoiceChannel).bitrate
		) {
			client.emit(
				'guildChannelBitrateUpdate',
				newChannel,
				(guildOldChannel as VoiceChannel).bitrate,
				(guildNewChannel as VoiceChannel).bitrate,
			);
		}
	},
});
