import type { Snowflake } from 'discord.js';
import type { GClient } from 'gcommands';
import { fetch } from 'undici';
import type { Keys } from '../index';
import { getUrl } from './getUrl';

export class VoteManager {
	client: GClient;
	keys: Keys[];
	/**
	 * @deprecated Use apiKeys instead.
	 */
	dblToken: string;
	cache;

	constructor(client: GClient, keys: Keys[], database: unknown) {
		this.client = client;
		this.keys = keys;

		/**
		 * @deprecated Use keys instead.
		 */
		this.dblToken = keys[0].apiKey;

		this.cache = database;
	}

	async voted(userId: Snowflake) {
		const cache = await this.getFromCache(userId);
		if (cache === true || cache > Date.now()) return true;
		else if (cache === false) return false;
		else {
			for (const key of this.keys) {
				const res = await fetch(
					getUrl(key.listType, this.client.user.id, userId),
					{
						method: 'GET',
						headers: {
							Authorization: key.apiKey,
						},
					},
				).catch(e => e);

				const data = await res?.json?.();

				if (data?.voted === true || data?.voted == 1) {
					this.setToDatabase(userId, new Date(Date.now() + 43200000));

					return true;
				}
			}

			this.setToDatabase(userId, null);
			return false;
		}
	}

	async getFromCache(userId): Promise<number | boolean> {
		if (this.cache?.type === 'mongodb') {
			return (await this.cache?.get?.('plugin-votes', { userId }))?.voted;
		} else if (this.cache?.type === 'prismaio') {
			return (
				await this.cache?.get?.('plugin-votes', {
					where: {
						userId: userId,
					},
				})
			)?.voted;
		} else {
			return await this.cache?.get?.(`plugin-votes-${userId}`);
		}
	}

	async setToDatabase(userId, expire) {
		if (this.cache?.type === 'mongodb') {
			const exist = await this.cache?.get?.('plugin-votes', {
				userId,
			});

			if (exist) {
				return await this.cache?.update?.(
					'plugin-votes',
					{
						userId,
					},
					{
						$set: {
							voted: expire,
							expires: expire,
						},
					},
				);
			} else {
				return await this.cache?.insert?.('plugin-votes', {
					userId,
					voted: expire,
					expires: expire,
				});
			}
		} else if (this.cache?.type === 'prismaio') {
			const exist = await this.cache?.get?.('plugin-votes', {
				where: {
					userId,
				},
			});

			if (exist) {
				return await this.cache?.update?.('plugin-votes', {
					where: {
						userId,
					},
					data: {
						voted: expire,
					},
				});
			} else {
				return await this.cache?.insert?.('plugin-votes', {
					userId,
					voted: expire,
				});
			}
		} else {
			return await this.cache?.insert?.(`plugin-votes-${userId}`, expire);
		}
	}
}
