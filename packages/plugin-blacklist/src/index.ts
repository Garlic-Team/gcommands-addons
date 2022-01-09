import { Logger, Plugin } from 'gcommands';

const pluginName = '@gcommands/plugin-blacklist'

new Plugin(pluginName, (client) => {
	if (!client.getDatabase()) return Logger.error('Please add the database parameter to the client.', pluginName);

	console.log('no empty')
});