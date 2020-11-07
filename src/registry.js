const fs = require('fs').promises;
const c = require('ansi-colors');
const path = require('path');
const {checkCommandModule,checkModule, checkProperties} = require('./validate');
const commandStatus = [[`${c.bold('Command')}`, `${c.bold('Status')}`, `${c.bold('Description')}`]];
const eventStatus =   [[`${c.bold('Event')}`, `${c.bold('Status')}`, `${c.bold('Description')}`]];
const handlerStatus =  [[`${c.bold('Handler')}`, `${c.bold('Status')}`, `${c.bold('Description')}`]];

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerCommands(client, path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let CommandName = file.substring(0, file.indexOf(".js"));
                try {
                    let CommandModule = require(path.join(__dirname, dir, file));
                    if(checkCommandModule(CommandName, CommandModule)) {
                        if(checkProperties(CommandName, CommandModule)) {
                            let { aliases } = CommandModule;
                            client.commands.set(CommandName, CommandModule.run);
                            if(aliases.length !== 0)
                                aliases.forEach(alias => client.commands.set(alias, CommandModule.run));
                            commandStatus.push(
                                [`${c.cyan(`${CommandName}`)}`, `${c.bgGreenBright('Success')}`, `${CommandModule.description}`]
                            )
                        }
                    }
                }
                catch(err) {
                    commandStatus.push(
                        [`${c.white(`${CommandName}`)}`, `${c.bgRedBright('Failed')}`, '']
                    );
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerEvents(client, path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                    eventStatus.push(
                        [`${c.cyan(`${eventName}`)}`, `${c.bgGreenBright('Success')}`, `${eventModule.description}`]
                    )
                }
                catch(err) {
                    eventStatus.push(
                        [`${c.white(`${eventName}`)}`, `${c.bgRedBright('Failed')}`, '']
                    );
                }
            }
        }
    }
}

async function registerHandlers(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerHandlers(client, path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let handlerName = file.substring(0, file.indexOf(".js"));
                try {
                    let handlerModule = require(path.join(__dirname, dir, file));
                    if(checkModule(handlerName, handlerModule)) {
                        client.handlers.set(handlerName, handlerModule.run);
                        handlerStatus.push([`${c.cyan(`${handlerName}`)}`, `${c.bgGreenBright('Success')}`, `${handlerModule.description}`])
                    }
                }
                catch(err) {
                    handlerStatus.push([`${c.white(`${handlerName}`)}`, `${c.bgRedBright('Failed')}`, '']);
                }
            }
        }
    }
}

module.exports = { 
    commandStatus, 
    eventStatus, 
    handlerStatus,
    registerEvents, 
    registerCommands,
    registerHandlers,
};
