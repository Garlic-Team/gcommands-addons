import { Logger, Plugin } from 'gcommands';
import express from 'express';
import { Webhook } from '@top-gg/sdk';
import { isVoted } from './utils/isVoted';

declare module 'gcommands' {
    interface GClient {
        isVoted: isVoted;
    }
}

const pluginName = '@gcommands/plugin-votes';

type ListTypes = 'TOP.GG'

interface PluginVotesOptions {
    type: ListTypes;
    dblToken: string;
    webhookToken: string;
    port?: number;
}

export default (options: PluginVotesOptions) => {
	if (!options.type) return Logger.error('Please define type', pluginName);
	if (!options.dblToken) return Logger.error('Please define dblToken', pluginName);
	if (!options.webhookToken) return Logger.error('Please define webhookToken', pluginName);

	new Plugin(pluginName, (client) => {
		client.isVoted = new isVoted(client, options.dblToken, client.getDatabase());
    
		expressServer(client.isVoted, options.webhookToken, options.port);
	});
};

export const expressServer = (isVoted: isVoted, authorization: string, port: number) => {
	const app = express();
	const webhook = new Webhook(authorization);
    
	app.post('/dblwebhook', webhook.listener(vote => {
		isVoted.cache.set(vote.user, true);
	}));
    
	app.listen(port || 3000, () => {
		Logger.debug(`Express server running at port ${port || 3000}`, pluginName);
	});
};

export * from './inhbitors/VoteInhibitor';
export * from './utils/isVoted';