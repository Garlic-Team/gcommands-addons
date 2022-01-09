import { LimitedCollection, Snowflake } from 'discord.js';
import { GClient } from 'gcommands';

export class BlacklistManagerClass {
    cache: LimitedCollection<Snowflake, boolean>;

    constructor() {
        this.cache = new LimitedCollection({ maxSize: 100 });
    }

	init(): void {
		return;
	}

	async hasBlacklist(client: GClient, userId: Snowflake): Promise<boolean> {
		const has = await this._getBlacklist(client, userId);

		return has;
	}

	async setBlacklist(client: GClient, userId: Snowflake, blacklist: boolean) {
		this._setBlacklist(client, userId, blacklist);
	}

	private async _getBlacklist(client: GClient, userId: Snowflake): Promise<boolean> {
		const db = (client.getDatabase() as any);

        if (String(this.cache.get(userId)) !== 'undefined') return this.cache.get(userId);
		let result: boolean = false;

		if (db.type === 'mongodb') {
			result = (await db.get('plugin-blacklist', { userId }))?.blacklisted;
		} else if (db.type === 'prismaio') {
			result = (await db.get('plugin-blacklist', { userId }))?.blacklisted;
		} else {
			result = (await db.get(`plugin-blacklist-${userId}}`));
		}

		this.cache.set(userId, result);
		return result;
	}

	private async _setBlacklist(client: GClient, userId: Snowflake, blacklisted: boolean) {
		const db = (client.getDatabase() as any);

        this.cache.set(userId, blacklisted);

		if (db.type === 'mongodb') {
			return await db.insert('plugin-blacklist', { userId, blacklisted });
		} else if (db.type === 'prismaio') {
			return await db.insert('plugin-blacklist', { userId, blacklisted });
		} else {
			return await db.insert(`plugin-blacklist-${userId}}`, blacklisted);
		}
	}
}

export const BlacklistManager = new BlacklistManagerClass();