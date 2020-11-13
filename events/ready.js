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

"use strict";

module.exports = async (client) => {

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

    // destroy client when no guild ID specified
    if (!config.guild_id || client.tools.isEmptyString(config.guild_id)) {
        client.logger.error("You must specify a GUILD ID in general config")
        return client.destroy()
    }

    let myGuild = await client.guilds.cache.get(config.guild_id)
    if (!myGuild) {
        client.logger.error("You must specify a VALID GUILD ID in general config")
        return client.destroy()
    }

    // cache required channels
    if (config.channels.event_log_channel.enabled) {
        let cachedChannel = await myGuild.channels.cache.get(config.channels.event_log_channel.id)
        if (!cachedChannel) {
            config.channels.event_log_channel.enabled = false
            client.generalConfig.channels.event_log_channel.enabled = false
        }
    }

    if (config.channels.member_log_channel.enabled) {
        let cachedChannel = await myGuild.channels.cache.get(config.channels.member_log_channel.id)
        if (!cachedChannel) {
            config.channels.member_log_channel.enabled = false
            client.generalConfig.channels.member_log_channel.enabled = false
        }
    }

    // set activity if text not blank
    if (!client.tools.isEmptyString(config.activity.text)) {
        client.user.setActivity(config.activity.text, {
            type: config.activity.type != null ? config.activity.type : "PLAYING"
        });
    }

    if (config.channels.event_log_channel.enabled) {
        let cachedChannel = await myGuild.channels.cache.get(config.channels.event_log_channel.id)
        if (cachedChannel) {
            client.tools.sendEmbed(cachedChannel, {
                title: `Discordbot ${client.user.username} restared.`,
                color: client.tools.randomColor(),
                thumbnail: client.user.displayAvatarURL()
            })
        }
    }

    client.logger.info("[LOGIN SUCCESSFUL] >> Bot logged in successful without problems..")
}