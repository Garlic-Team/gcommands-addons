import { ListTypes } from '../index';

export const getUrl = (type: ListTypes, clientId: string, userId: string) => {
	switch(type) {
	case 'TOP.GG': {
		return `https://top.gg/api/bots/${clientId}/check?userId=${userId}`;
	}
	case 'VoidBots': {
		return `https://api.voidbots.net/bot/voted/${clientId}/${userId}`;
	}
	}
};