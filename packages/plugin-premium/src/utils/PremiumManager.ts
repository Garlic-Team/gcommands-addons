import { LimitedCollection, Snowflake } from 'discord.js';
import { GClient } from 'gcommands';

export class PremiumManagerClass {
	cache: LimitedCollection<Snowflake, boolean>;

	constructor() {
		this.cache = new LimitedCollection({ maxSize: 100 });
	}

	init(): void {
		return;
	}

	async hasPremium(client: GClient, userId: Snowflake): Promise<boolean> {
		const has = await this._getPremium(client, userId);

		return has;
	}

	async setPremium(client: GClient, userId: Snowflake, blacklist: boolean) {
		this._setPremium(client, userId, blacklist);
	}

	private async _getPremium(client: GClient, userId: Snowflake): Promise<boolean> {
		const db = (client.getDatabase() as any);

		if (String(this.cache.get(userId)) !== 'undefined') return this.cache.get(userId);
		let result = false;

		if (db.type === 'mongodb') {
			result = (await db.get('plugin-premium', { userId }))?.blacklisted;
		} else if (db.type === 'prismaio') {
			result = (await db.get('plugin-premium', { userId }))?.blacklisted;
		} else {
			result = (await db.get(`plugin-premium-${userId}}`));
		}

		this.cache.set(userId, result);
		return result;
	}

	private async _setPremium(client: GClient, userId: Snowflake, blacklisted: boolean) {
		const db = (client.getDatabase() as any);

		this.cache.set(userId, blacklisted);

		if (db.type === 'mongodb') {
			return await db.insert('plugin-premium', { userId, blacklisted });
		} else if (db.type === 'prismaio') {
			return await db.insert('plugin-premium', { userId, blacklisted });
		} else {
			return await db.insert(`plugin-premium-${userId}}`, blacklisted);
		}
	}
}

export const PremiumManager = new PremiumManagerClass();