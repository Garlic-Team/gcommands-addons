import { CommandContext, ComponentContext, Inhibitor } from 'gcommands';
import { isVoted } from '../utils/isVoted';

declare module 'gcommands' {
    interface GClient {
        isVoted: isVoted;
    }
}

export class VoteInhibitor extends Inhibitor.Inhibitor {
    async run(ctx: CommandContext | ComponentContext): Promise<any> {
        const voted = await ctx.client.isVoted.voted(ctx.userId);
        
        if (voted) return true;
        else ctx.reply({
            content: this.resolveMessage(ctx) || `[Before you use this command, you have to vote for me on top.gg](https://top.gg/bot/${ctx.client.user.id})`,
            ephemeral: true
        })
    }
}