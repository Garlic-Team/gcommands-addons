import { Listener } from "gcommands";

new Listener('interactionCreate', {
    name: 'interactionCreate-moreevents',
    run: (interaction) => {
        const client = interaction.client;

        if (interaction.isButton()) {
            client.emit('clickButton', interaction);
        }

        else if (interaction.isSelectMenu()) {
            client.emit('selectMenu', interaction);
        }

        else if (interaction.isAutocomplete()) {
            client.emit('autocomplete', interaction);
        }
    }
})