import { CommandContext, ComponentContext, Inhibitor } from 'gcommands';

export class VoteInhibitor extends Inhibitor.Inhibitor {
	async run(ctx: CommandContext | ComponentContext): Promise<any> {
		const voted = await ctx.client.voteManager.voted(ctx.userId);

		if (voted) return true;
		else
			return ctx.reply({
				content:
					this.resolveMessage(ctx) ||
					`[Before you use this command, you have to vote for me on top.gg](https://top.gg/bot/${ctx.client.user.id})`,
				ephemeral: true,
			});
	}
}
