import { Listener } from "gcommands";

new Listener({
    event: 'guildUpdate',
    name: 'guildUpdate-moreEvents',
    run: (oldGuild, newGuild) => {
        const client = oldGuild.client;

        if (oldGuild.premiumTier < newGuild.premiumTier) {
            client.emit('guildBoostLevelUp',
                newGuild,
                oldGuild.premiumTier,
                newGuild.premiumTier,
            );
        }

        if (oldGuild.premiumTier > newGuild.premiumTier) {
            client.emit('guildBoostLevelDown',
                newGuild,
                oldGuild.premiumTier,
                newGuild.premiumTier,
            );
        }

        if (oldGuild.banner !== newGuild.banner) {
            client.emit('guildBannerUpdate',
                newGuild,
                oldGuild.banner,
                newGuild.banner,
            );
        }

        if (oldGuild.afkChannel !== newGuild.afkChannel) {
            client.emit('guildAfkChannelUpdate',
                newGuild,
                oldGuild.afkChannel,
                newGuild.afkChannel,
            );
        }

        if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
            client.emit('guildVanityURLUpdate',
                newGuild,
                oldGuild.vanityURLCode,
                newGuild.vanityURLCode,
            );
        }

        if (oldGuild.features.length !== newGuild.features.length) {
            client.emit('guildFeaturesUpdate',
                newGuild,
                oldGuild.features,
                newGuild.features,
            );
        }

        if (oldGuild.nameAcronym !== newGuild.nameAcronym) {
            client.emit('guildAcronymUpdate',
                newGuild,
                oldGuild.nameAcronym,
                newGuild.nameAcronym,
            );
        }

        if (oldGuild.ownerId !== newGuild.ownerId) {
            client.emit('guildOwnerUpdate',
                newGuild,
                oldGuild.ownerId,
                newGuild.ownerId,
            );
        }

        if (oldGuild.maximumMembers !== newGuild.maximumMembers) {
            client.emit('guildMaximumMembersUpdate',
                newGuild,
                oldGuild.maximumMembers,
                newGuild.maximumMembers,
            );
        }

        if (oldGuild.partnered !== newGuild.partnered) {
            client.emit('guildPartnerUpdate',
                newGuild,
                oldGuild.partnered,
                newGuild.partnered,
            );
        }

        if (oldGuild.verified !== newGuild.verified) {
            client.emit('guildVerifyUpdate',
                newGuild,
                oldGuild.verified,
                newGuild.verified,
            );
        }
    }
})