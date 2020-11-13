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
 */

"use strict"

var commandLastPost = {}

module.exports = async (client, message) => {

    /**
// CONFIG EXAMPLE
{
    "prefix": "$",
    "guild_id": "",
    "activity": {
        "text": "My awesome Bot :P",
        "type": "PLAYING",
        "valid_types_note": "PLAYING, STREAMING, WATCHING, LISTENING"
    },
    "channels": {
        "event_log_channel": {
            "enabled": true,
            "id": "Logmessage Channel (Paste valid Channel ID if this channel should be active)"
        },
        "member_log_channel": {
            "enabled": true,
            "id": "Join/Leave message channel (Paste valid Channel ID if this channel should be active)",
            "message_joined": "HI, {username}#{discriminator} :P Welcome here at our Discord Server\n\n{user_mention}",
            "message_left": "{username}#{discriminator} has left our beautiful server :("
        }
    },
    "join_dm": {
        "enabled": true,
        "message": "Hi {username}, Welcome at {servername}'s Discord Server."
    }
}
     */
    var config = client.generalConfig

    // dont react to clients
    if (message.author.client) return
    // dont react to dms
    if (message.channel.type == 'dm') return
    // dont react on other guilds
    if (message.channel.guild.id != config.guild_id) return

    var prefix = config.prefix

    // send prefix at just mention
    if (message.content == `<@!${client.user.id}>`) {
        message.reply("Prefix is `" + prefix + "`")
        return
    }
    // make commands run with mention too
    if (message.content.startsWith(`<@!${client.user.id}>`)) {
        prefix = `<@!${client.user.id}>`
    }

    // ignore messages without prefix at the beginning
    if (message.content.indexOf(prefix) !== 0) return

    // argument declaration
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    // grab command of the command nap
    var cmd = client.commands.get(command)

    // do nothing if command doesnt exist
    if (!cmd) return

    // anti commandspam ( 1 sec delay )
    var ts = new Date().getTime()
    if (commandLastPost[message.author.id] != null) {
        if (ts - commandLastPost[message.author.id] < 1000) {
            return message.reply("Please do not spam commands...")
        }
    }
    commandLastPost[message.author.id] = ts

    // finally run the command
    cmd.run(client, message, args)
    return



}