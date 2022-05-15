import { Logger, Plugin } from 'gcommands';
import { Cooldowns } from './utils/CooldownManager';

const pluginName = '@gcommands/plugin-cooldowns';

new Plugin(pluginName, (client) => {
	if (!client.getDatabase()) return Logger.error('Please add the database parameter to the client.', pluginName);

	Cooldowns.init();
});

export * from './inhibitors/CooldownInhibitor';
export * from './utils/CooldownManager';
