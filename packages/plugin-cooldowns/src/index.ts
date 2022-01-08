import { Plugin } from 'gcommands';

new Plugin('@gcommands/plugin-cooldowns', (client) => {
	console.log('no empty function', client.user.tag);
});