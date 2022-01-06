import { Client, Snowflake } from "discord.js";
import LruCache from 'lru-cache';
import hyttpo from 'hyttpo';

export class isVoted {
    client: Client;
    cache: LruCache<Snowflake, boolean>;
    dblToken: string;

    constructor(client: Client, dblToken: string) {
        this.client = client;
        this.dblToken = dblToken;

        this.cache = new LruCache({ max: 200, maxAge: 3600000 });
    }

    async voted(userId: Snowflake) {
        const cache = this.cache.get(userId);
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
}