import { Plugin } from 'gcommands';

new Plugin('@gcommands/plugin-language', () => {
	//registerDirectory(path.join(__dirname, 'listeners'));
});

export * from './utils/LanguageManager';