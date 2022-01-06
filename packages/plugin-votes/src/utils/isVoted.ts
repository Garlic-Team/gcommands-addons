import { Snowflake } from "discord.js";
import { GClient } from "gcommands";
import hyttpo from 'hyttpo';

export class isVoted {
    client: GClient;
    dblToken: string;
    cache;

    constructor(client: GClient, dblToken: string, database: unknown) {
        this.client = client;
        this.dblToken = dblToken;

        this.cache = client.getDatabase(database);
    }

    async voted(userId: Snowflake) {
        const cache = await this.getFromCache(userId);
        if (cache && cache === true) return true;
        else {
            const res = await hyttpo.request({
                method: 'GET',
                url: `https://top.gg/api/bots/${this.client.user.id}/check?userId=${userId}`,
                headers: {
                    'Authorizarion': this.dblToken
                }
            }).catch(e => e);

            if (parseInt(res.data['voted']) > 1) {
                this.cache.set(userId, true);

                return true;
            } else {
                this.cache.set(userId, false);

                return false;
            }
        }
    }

    async getFromCache(userId): Promise<boolean> {
        if (this.cache.type === 'mongodb') {
            return (await this.cache.get('plugin-votes', { userId })).voted;
        } else if (this.cache.type === 'prismaio') {
            return (await this.cache.get('plugin-votes', { userId })).voted;
        } else {
            return (await this.cache.get(`plugin-votes-${userId}}`));
        }
    }

    async setToDatabase(userId, voted) {
        if (this.cache.type === 'mongodb') {
            return await this.cache.set('plugin-votes', { userId, voted });
        } else if (this.cache.type === 'prismaio') {
            return await this.cache.set('plugin-votes', { userId, voted });
        } else {
            return await this.cache.set(`plugin-votes-${userId}}`, voted);
        }
    }
}