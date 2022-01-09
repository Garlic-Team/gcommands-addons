import { Command, Logger, Plugin } from 'gcommands';
import { BlacklistInhibitor } from './inhibitors/BlacklistInhibitor';
import { BlacklistManager } from './utils/BlacklistManager';

const pluginName = '@gcommands/plugin-blacklist'

Command.setDefaults({
	inhibitors: [
		new BlacklistInhibitor()
	]
})

new Plugin(pluginName, (client) => {
	if (!client.getDatabase()) return Logger.error('Please add the database parameter to the client.', pluginName);

	BlacklistManager.init();
});