const { Client, Collection } = require('discord.js');

const fs = require('fs');
const klaw = require('klaw');
const Keyv = require('keyv');
const path = require('path');
module.exports = class LSClient extends Client {
	constructor() {
		super();
		this.commands = new Collection();
		this.aliases = new Collection();
		this.cooldowns = new Map();
		this.config = require('../config.json');
		this.db = new Keyv('sqlite://lastseen.sqlite')
			.on('error', err => console.error(err));

	}

	loadCommand(commandPath, commandName) {
		try {
			const command = require(`${commandPath}${path.sep}${commandName}`);
			command.location = commandPath;
			this.commands.set(command.help.name, command);
		}
		catch (error) {
			console.log(`Error loading command ${commandName}: ${error.stack}`);
		}
	}

	async unloadCommand(commandPath, commandName) {
		let command;
		if (this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		}
		if (!command) return `The command \`${commandName}\` doesn't seem to exist. Please try again.`;
		await delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)];
		this.commands.delete(commandName);
	}

	loadCommands() {
		klaw('./Commands/').on('data', (item) => {
			const file = path.parse(item.path);
			if (!file.ext || file.ext !== '.js') return;
			const response = this.loadCommand(file.dir, `${file.name}${file.ext}`);
			if (response) console.log(response);
		});
	}

	loadEvents() {
		fs.readdir('./Events/', (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const event = require(`../Events/${file}`);
				const eventName = file.split('.')[0];
				this.on(eventName, event.bind(null, this));
			});
		});
	}

	findCommand(name) {
		return this.commands.get(name) || this.commands.find(command => command.help.aliases && command.help.aliases.includes(name));
	}

	async connect() {
		await this.loadEvents();
		await this.loadCommands();
		this.login(this.config.token);
	}
};
