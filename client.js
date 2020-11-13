/**
 *   Copyright © 2020 | depascaldc <https://depascaldc.xyz/> | Discord: [depascaldc]#4093
 *   
 *  ____  _                       _ ____        _   
 * |  _ \(_)___  ___ ___  _ __ __| | __ )  ___ | |_ 
 * | | | | / __|/ __/ _ \| '__/ _` |  _ \ / _ \| __|
 * | |_| | \__ \ (_| (_) | | | (_| | |_) | (_) | |_ 
 * |____/|_|___/\___\___/|_|  \__,_|____/ \___/ \__|                                                 
 *  _   _           _          _ ____  
 * | \ | | ___   __| | ___    | / ___| 
 * |  \| |/ _ \ / _` |/ _ \_  | \___ \ 
 * | |\  | (_) | (_| |  __/ |_| |___) |
 * |_| \_|\___/ \__,_|\___|\___/|____/ 
 *                                                         
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * HOWTO: https://github.com/depascaldc/DiscordBot-JS-Template/blob/master/README.md
 * 
 * HOWTO: https://github.com/depascaldc/DiscordBot-JS-Template/blob/master/README.md
 *   
 */

"use strict";

const {
    Client,
    Intents
} = require('discord.js')

const Enmap = require('enmap')
var fs = require('fs')

var {
    Logger,
    C
} = require('logger-nodejs-simple')

const credentials = require('./configs/credentials.json')

/**
 * // TODO: ENABLE ALL PRIVILEGED INTENTS AT THE DISCORD DEVELOPER PORTAL to use all of them or use a Intent Calculator to provide the right inteeger.
 *          
 *          U can use this: https://depascaldc.xyz/tools/discordintents/
 */
const client = new Client({
    ws: {
        intents: Intents.ALL
    }
})

// GLOBAL bot variables
client.commands = new Enmap()
client.modules = {}
client.tools = require('./tools')
client.generalConfig = require('./configs/general.json')
client.useLogChannel = false
client.announceMembers = false
client.logger = new Logger(Logger.LOG_LEVELS.DEBUG)

// cache modules ( modules List ./configs/modules.json ) faster available 
for (let modulename of require('./configs/modules.json').list) {
    try {
        client.modules[modulename] = require(modulename)
        client.logger.debug("[MODULE LOADED] >> " + modulename)
    } catch (err) {
        client.logger.error("Could not load module " + modulename)
        client.logger.error(err)
    }
}

// load client events
fs.readdir("./events/", (error, files) => {
    if (error) throw error
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const event = require(`./events/${file}`)
        let eventName = file.split(".")[0]
        client.logger.debug(`[EVENT LOADED] >> ${eventName}...`)
        client.on(eventName, event.bind(null, client))
    })
})

// load commands
fs.readdir("./commands/", (error, files) => {
    if (error) throw error
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        if (file.startsWith("_")) return
        let props = require(`./commands/${file}`)
        let commandName = file.split(".")[0]
        client.commands.set(commandName, props)
        if (props.aliases != null) {
            for (let i = 0; i < props.aliases.length; i++) {
                client.commands.set(props.aliases[i], props)
            }
        }
        client.logger.debug(`[COMMAND LOADED] >> ${commandName}... ${props.aliases != null ? "Alaises: " + props.aliases.join(", ") : ""}`)
    })
})

// finally login the bot.
client.login(credentials.client_token)