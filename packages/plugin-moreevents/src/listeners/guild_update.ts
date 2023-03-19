import { Listener } from 'gcommands';

new Listener({
	event: 'guildUpdate',
	name: 'guildUpdate-moreEvents',
	run: (oldGuild, newGuild) => {
		const client = oldGuild.client;

		if (oldGuild.premiumTier < newGuild.premiumTier) {
			client.emit(
				'guildBoostLevelUp',
				newGuild,
				oldGuild.premiumTier,
				newGuild.premiumTier
			);
		}

		if (oldGuild.premiumTier > newGuild.premiumTier) {
			client.emit(
				'guildBoostLevelDown',
				newGuild,
				oldGuild.premiumTier,
				newGuild.premiumTier
			);
		}

		if (oldGuild.banner !== newGuild.banner) {
			client.emit(
				'guildBannerUpdate',
				newGuild,
				oldGuild.banner,
				newGuild.banner
			);
		}

		if (oldGuild.afkChannel !== newGuild.afkChannel) {
			client.emit(
				'guildAfkChannelUpdate',
				newGuild,
				oldGuild.afkChannel,
				newGuild.afkChannel
			);
		}

		if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
			client.emit(
				'guildVanityURLUpdate',
				newGuild,
				oldGuild.vanityURLCode,
				newGuild.vanityURLCode
			);
		}

		if (oldGuild.features.length !== newGuild.features.length) {
			client.emit(
				'guildFeaturesUpdate',
				newGuild,
				oldGuild.features,
				newGuild.features
			);
		}

		if (oldGuild.nameAcronym !== newGuild.nameAcronym) {
			client.emit(
				'guildAcronymUpdate',
				newGuild,
				oldGuild.nameAcronym,
				newGuild.nameAcronym
			);
		}

		if (oldGuild.ownerId !== newGuild.ownerId) {
			client.emit(
				'guildOwnerUpdate',
				newGuild,
				oldGuild.ownerId,
				newGuild.ownerId
			);
		}

		if (oldGuild.maximumMembers !== newGuild.maximumMembers) {
			client.emit(
				'guildMaximumMembersUpdate',
				newGuild,
				oldGuild.maximumMembers,
				newGuild.maximumMembers
			);
		}

		if (oldGuild.partnered !== newGuild.partnered) {
			client.emit(
				'guildPartnerUpdate',
				newGuild,
				oldGuild.partnered,
				newGuild.partnered
			);
		}

		if (oldGuild.verified !== newGuild.verified) {
			client.emit(
				'guildVerifyUpdate',
				newGuild,
				oldGuild.verified,
				newGuild.verified
			);
		}
		
		if (oldGuild.name !== newGuild.name) {
			client.emit(
				'guildNameUpdate',
				newGuild,
				oldGuild.name,
				newGuild.name
			);
		}
		
		if (oldGuild.icon !== newGuild.icon) {
			client.emit(
				'guildIconUpdate',
				newGuild,
				oldGuild
			);
		}
		
		if (oldGuild.discoverySplash !== newGuild.discoverySplash) {
			client.emit(
				'guildDiscoverySplashUpdate',
				newGuild,
				oldGuild
			);
		}
		
		if (oldGuild.splash !== newGuild.splash) {
			client.emit(
				'guildSplashUpdate',
				newGuild,
				oldGuild
			);
		}
		
		if (oldGuild.description !== newGuild.description) {
			client.emit(
				'guildDescriptionUpdate',
				newGuild,
				oldGuild.description,
				newGuild.description
			);
		}
		
		if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
			client.emit(
				'guildDefaultMessageNotifications',
				newGuild,
				oldGuild.defaultMessageNotifications,
				newGuild.defaultMessageNotifications
			);
		}
		
		if (oldGuild.explicitContentFilter !== newGuild.explicitContentFilter) {
			client.emit(
				'guildExplicitContentFilter',
				newGuild,
				oldGuild.explicitContentFilter,
				newGuild.explicitContentFilter
			);
		}
	},
});
