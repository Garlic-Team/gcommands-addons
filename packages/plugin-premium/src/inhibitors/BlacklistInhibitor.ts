import { CommandContext, ComponentContext, Inhibitor } from 'gcommands';
import { BlacklistManager } from '../utils/BlacklistManager';

export class BlacklistInhibitor extends Inhibitor.Inhibitor {
	async run(ctx: CommandContext | ComponentContext): Promise<any> {
		const hasBlacklist = await BlacklistManager.hasBlacklist(ctx.client, ctx.userId);

		if (hasBlacklist) {
			return ctx.reply({
				content: this.resolveMessage(ctx) || 'You\'re blacklisted.',
				ephemeral: true
			});
		}
		else return true;
	}
}