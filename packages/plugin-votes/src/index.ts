import { Logger, Plugin } from 'gcommands';
import express from 'express';
import { VoteManager } from './utils/VoteManager';

const pluginName = '@gcommands/plugin-votes';

export type ListTypes = 'TOP.GG' | 'VoidBots'
export interface PluginVotesOptions {
	/**
	 * @deprecated Use listTypes instead.
	 */
    type: ListTypes | ListTypes[];
	/**
	 * @deprecated Use apiKeys instead.
	 */
    dblToken: string | string[];
	/**
	 * @deprecated Use serverAuthKey instead.
	 */
	webhookToken: string;

	/**
	 * Bot list type(s) you want to use.
	 */
	listTypes: ListTypes | ListTypes[];

	/**
	 * Your api key(s) for the list(s) you want to use.
	 */
	apiKeys: string | string[];

	/**
	 * Authorization key for the webhook server.
	 */
	serverAuthKey: string;

	/**
	 * The port the webhook server will listen on.
	 */
    port?: number;

	/**
	 * The database to use.
	 */
	database?: any;
}

export interface Keys {
	listType: ListTypes;
	apiKey: string;
}

export default (options: PluginVotesOptions) => {
	if (options.type) options.listTypes = options.type;
	if (options.dblToken) options.apiKeys = options.dblToken;
	if (options.webhookToken) options.serverAuthKey = options.webhookToken;

	if (!options.listTypes) return Logger.error('Missing listTypes property', pluginName);
	if (!options.apiKeys) return Logger.error('Missing apiKeys property', pluginName);
	if (!options.serverAuthKey) return Logger.error('Missing serverAuthKey property', pluginName);

	if (options.database && typeof options.database.init === 'function') {
		options.database.init();
	}

	new Plugin(pluginName, (client) => {
		if (!options.database && !client.getDatabase()) return Logger.error('Please add the database parameter to the client/plugin.', pluginName);

		const keys: Keys[] = 
			Array.isArray(options.listTypes) ?
				options.listTypes?.map((_, i) => {
					return {
						listType: options.listTypes[i] as ListTypes,
						apiKey: options.apiKeys[i]
					};
				}) : [
					{
						listType: options.listTypes  as ListTypes,
						apiKey: options.apiKeys
					}
				] as Keys[];

		const manager = new VoteManager(client, keys, options.database || client.getDatabase());

		/**
		 * @deprecated Use client.voteManager instead.
		 */
		client.isVoted = manager;
		client.voteManager = manager;

		client._listTypes = options.type;
    
		expressServer(client.voteManager, options.serverAuthKey, options.port);
	});
};

export const expressServer = (voteManager: VoteManager, serverAuthKey: string, port: number) => {
	const app = express();
	
	app.use(express.json());
    
	app.post('/dblwebhook', (req, res) => {
		if (req.headers.authorization !== serverAuthKey) {
			res.status(401).send('Unauthorized');
			return;
		}

		voteManager.setToDatabase(req.body.user, new Date(Date.now() + 43200000));
		res.status(204).end();
	});

	app.listen(port || 3000, () => {
		Logger.debug(`Express server running at port ${port || 3000}`, pluginName);
	});
};

export * from './inhbitors/VoteInhibitor';
export * from './utils/VoteManager';
export * as isVoted from './utils/VoteManager';

declare module 'gcommands' {
    interface GClient {
		/**
		 * @deprecated Use client.voteManager instead.
		 */
        isVoted: VoteManager;
		voteManager: VoteManager;
		_listTypes: ListTypes | ListTypes[];
    }
}