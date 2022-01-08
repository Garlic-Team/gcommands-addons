import { Snowflake } from 'discord.js';
import { GClient } from 'gcommands';
import ms from 'ms';

export class CooldownManager {
	init(): void {
		return;
	}

	async hasCooldown(client: GClient, userId: Snowflake): Promise<boolean | string> {
		const has = await this._getCooldown(client, userId);
		if (has && has > Date.now()) return `${ms(has - Date.now())}`;
		else return false;
	}

	async setCooldown(client: GClient, userId: Snowflake, cooldown: number) {
		this._setCooldown(client, userId, cooldown);
	}

	private async _getCooldown(client: GClient, userId: Snowflake): Promise<number | null | undefined> {
		const db = (client.getDatabase() as any);

		if (db.type === 'mongodb') {
			return (await db.get('plugin-cooldowns', { userId }))?.cooldown;
		} else if (db.type === 'prismaio') {
			return (await db.get('plugin-cooldowns', { userId }))?.cooldown;
		} else {
			return (await db.get(`plugin-cooldowns-${userId}}`));
		}
	}

	private async _setCooldown(client: GClient, userId: Snowflake, cooldown: number) {
		const db = (client.getDatabase() as any);
		const cldwn = cooldown + Date.now();

		if (db.type === 'mongodb') {
			return await db.insert('plugin-cooldowns', { userId, cooldown: cldwn, expires: new Date(cldwn) });
		} else if (db.type === 'prismaio') {
			return await db.insert('plugin-cooldowns', { userId, cooldown: cldwn });
		} else {
			return await db.insert(`plugin-cooldowns-${userId}}`, cldwn);
		}
	}
}

export const Cooldowns = new CooldownManager();