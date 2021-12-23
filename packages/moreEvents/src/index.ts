import { Plugin, registerDirectory } from 'gcommands';
import * as path from 'path';

new Plugin('moreEvents', () => {
    registerDirectory(path.join(__dirname, 'listeners'));
})