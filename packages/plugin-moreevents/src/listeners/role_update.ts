import { Listener } from 'gcommands';

new Listener({
	event: 'roleUpdate',
	name: 'roleUpdate-moreevents',
	run: (oldRole, newRole) => {
		const client = oldRole.client;

		if (oldRole.rawPosition !== newRole.rawPosition) {
			client.emit('rolePositionUpdate', newRole, oldRole.rawPosition, newRole.rawPosition);
		}

		if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
			client.emit('rolePermissionsUpdate', newRole, oldRole.permissions.bitfield, newRole.permissions.bitfield);
		}
	},
});
