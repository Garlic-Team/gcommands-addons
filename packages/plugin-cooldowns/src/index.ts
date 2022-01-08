import { Plugin } from 'gcommands';
import { Cooldowns } from './utils/CooldownManager';

new Plugin('@gcommands/plugin-cooldowns', () => {
	Cooldowns.init();
});