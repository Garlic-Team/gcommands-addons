import { Command, Logger, Plugin } from 'gcommands';
import { PremiumInhibitor } from './inhibitors/PremiumInhibitor';
import { PremiumManager } from './utils/PremiumManager';

const pluginName = '@gcommands/plugin-premium';

new Plugin(pluginName, (client) => {
	if (!client.getDatabase()) return Logger.error('Please add the database parameter to the client.', pluginName);

	PremiumManager.init();
});

export * from './inhibitors/PremiumInhibitor';
export * from './utils/PremiumManager';