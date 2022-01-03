import { Listener } from "gcommands";

new Listener({
    event: 'guildMemberUpdate',
    name: 'guildMemberUpdate-moreEvents',
    run: (oldMember, newMember) => {
        const client = oldMember.client;

        if (oldMember.premiumSince && newMember.premiumSince) {
            client.emit('guildMemberBoost',
                newMember,
                oldMember.premiumSince,
                newMember.premiumSince,
            );
        }

        if (oldMember.premiumSince && !newMember.premiumSince) {
            client.emit('guildMemberUnboost',
                newMember,
                oldMember.premiumSince,
                newMember.premiumSince,
            );
        }

        if (oldMember.nickname !== newMember.nickname) {
            client.emit('guildMemberNicknameUpdate',
                newMember,
                oldMember.nickname,
                newMember.nickname,
            );
        }

        if (newMember.pending === false) {
            client.emit('guildMemberAcceptShipScreening',
                newMember,
            );
        }
    }
})