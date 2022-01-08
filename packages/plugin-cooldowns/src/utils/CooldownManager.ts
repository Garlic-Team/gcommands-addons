import { LimitedCollection, LimitedCollectionOptions, Snowflake } from 'discord.js';
import { GClient } from 'gcommands';

export class CooldownManager {
	cache: LimitedCollectionOptions<Snowflake, number>;

	constructor() {
		this.cache = new LimitedCollection({ maxSize: 100 });
	}

	init(): void {
		return;
	}

	async hasCooldown(client: GClient, userId: Snowflake): Promise<boolean> {
		const has = await this._getCooldown(client, userId);
		if (has && Date.now() > has) return true;
		else return false;
	}

	async setCooldown(client: GClient, userId: Snowflake, cooldown: number) {
		this._setCooldown(client, userId, cooldown);
	}

	private async _getCooldown(client: GClient, userId: Snowflake): Promise<number | null | undefined> {
		const db = (client.getDatabase() as any);

		if (db.type === 'mongodb') {
			return (await db.get('plugin-cooldowns', { userId })).cooldown;
		} else if (db.type === 'prismaio') {
			return (await db.get('plugin-cooldowns', { userId })).cooldown;
		} else {
			return (await db.get(`plugin-cooldowns-${userId}}`));
		}
	}

	private async _setCooldown(client: GClient, userId: Snowflake, cooldown: number) {
		const db = (client.getDatabase() as any);

		if (db.type === 'mongodb') {
			return await db.set('plugin-cooldowns', { userId, cooldown: cooldown + Date.now() });
		} else if (db.type === 'prismaio') {
			return await db.get('plugin-cooldowns', { userId, cooldown: cooldown + Date.now() });
		} else {
			return await db.set(`plugin-cooldowns-${userId}}`, cooldown + Date.now());
		}
	}
}

export const Cooldowns = new CooldownManager();