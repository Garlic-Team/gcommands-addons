import { CommandContext, ComponentContext, Inhibitor } from 'gcommands';
import { Cooldowns } from '../utils/CooldownManager';
import ms from 'ms';
import { Snowflake } from 'discord.js';

export interface CooldownInhibitorOptions extends Inhibitor.InhibitorOptions {
	whitelist?: Array<Snowflake>;
	getWhitelist?(ctx: CommandContext | ComponentContext): Array<Snowflake>;
	cooldown: string;
}

export class CooldownInhibitor extends Inhibitor.Inhibitor {
	public whitelist?: Array<Snowflake>;
	public getWhitelist?(
		ctx: CommandContext | ComponentContext,
	): Array<Snowflake>;
	public readonly cooldown: number;

	constructor(options: CooldownInhibitorOptions) {
		super(options);

		this.whitelist = options.whitelist;
		this.getWhitelist = options.getWhitelist;
		this.cooldown = ms(options.cooldown);
	}

	async run(ctx: CommandContext | ComponentContext): Promise<any> {
		const dynamicWhitelist = this.getWhitelist?.(ctx);
		if (dynamicWhitelist) this.whitelist = dynamicWhitelist;

		if (this.whitelist?.includes(ctx.userId)) return true;

		const hasCooldown = await Cooldowns.hasCooldown(ctx.client, ctx.userId);
		if (hasCooldown) {
			return ctx.reply({
				content:
					(this.resolveMessage(ctx) as string)?.replace(
						'{duration}',
						`${hasCooldown}`,
					) || `You need wait ${hasCooldown}`,
				ephemeral: true,
			});
		} else {
			Cooldowns.setCooldown(ctx.client, ctx.userId, this.cooldown);
			return true;
		}
	}
}
