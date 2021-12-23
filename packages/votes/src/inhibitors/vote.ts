import hyttpo from 'hyttpo';
import { CommandContext } from "gcommands";

export class VoteInhibitor {
    public readonly dblToken: string;

    constructor(dblToken?: string) {
        this.dblToken = dblToken;
    }

    async run(ctx: CommandContext): Promise<boolean> {
        const voted = await hyttpo.request({
            method: 'GET',
            url: `https://top.gg/api/bots/${ctx.client.user.id}/check?userId=${ctx.userId}`,
            headers: {
                'Authorization': this.dblToken
            }
        }).catch(e => e);

        if (voted.data.voted > 0) return true;
        else {
            ctx.reply({
                content: ctx.client.responses.requiredVoteMessage,
                ephemeral: true
            })

            return false;
        };
    }
}