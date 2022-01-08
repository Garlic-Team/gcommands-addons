import { CommandContext, ComponentContext, Inhibitor } from 'gcommands';
import { Cooldowns } from '../utils/CooldownManager';
import ms from 'ms';

export interface CooldownInhibitorOptions extends Inhibitor.InhibitorOptions {
	cooldown: string;
}

export class CooldownInhibitor extends Inhibitor.Inhibitor {
	cooldown: number;
	constructor(options: CooldownInhibitorOptions) {
		super(options);
    
		this.cooldown = ms(options.cooldown);
	}

	async run(ctx: CommandContext | ComponentContext): Promise<any> {
		const hasCooldown = await Cooldowns.hasCooldown(ctx.client, ctx.userId);
		if (hasCooldown) {
			return ctx.reply({
				content: this.resolveMessage(ctx) || `You need wait ${hasCooldown}`,
				ephemeral: true
		    });
		} else {
			Cooldowns.setCooldown(ctx.client, ctx.userId, this.cooldown);
			return true;
		}
	}
}