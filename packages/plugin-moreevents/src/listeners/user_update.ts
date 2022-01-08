import { Listener } from 'gcommands';

new Listener({
	event: 'userUpdate',
	name: 'userUpdate-moreevents',
	run: (oldUser, newUser) => {
		const client = oldUser.client;

		if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
			client.emit('userAvatarUpdate',
				newUser,
				oldUser.displayAvatarURL(),
				newUser.displayAvatarURL(),
			);
		}

		if (oldUser.username !== newUser.username) {
			client.emit('userUsernameUpdate',
				newUser,
				oldUser.username,
				newUser.username,
			);
		}

		if (oldUser.discriminator !== newUser.discriminator) {
			client.emit('userDiscriminatorUpdate',
				newUser,
				oldUser.discriminator,
				newUser.discriminator,
			);
		}


		if (oldUser.flags !== newUser.flags) {
			client.emit('userFlagsUpdate',
				newUser,
				oldUser.flags,
				newUser.flags,
			);
		}

		if (oldUser.banner !== newUser.banner) {
			client.emit('userBannerUpdate',
				newUser,
				oldUser.banner,
				newUser.banner
			);
		}
	}
});