import { CommandContext, ComponentContext, Inhibitor } from 'gcommands';
import { PremiumManager } from '../utils/PremiumManager';

export class PremiumInhibitor extends Inhibitor.Inhibitor {
	async run(ctx: CommandContext | ComponentContext): Promise<any> {
		const hasPremium = await PremiumManager.hasPremium(ctx.client, ctx.userId);

		if (!hasPremium) {
			return ctx.reply({
				content: this.resolveMessage(ctx) || 'This command is premium only.',
				ephemeral: true
			});
		}
		else return true;
	}
}