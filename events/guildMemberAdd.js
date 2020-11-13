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

module.exports = async (client, member) => {

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

    if (config.channels.member_log_channel.enabled) {
        let replaceAll = client.tools.replaceAll;
        let message = config.channels.member_log_channel.message_joined
        if (message) {
            message = replaceAll(message, "{username}", member.user.username)
            message = replaceAll(message, "{discriminator}", member.user.discriminator)
            message = replaceAll(message, "{servername}", member.guild.name)
            message = replaceAll(message, "{user_mention}", `<@!${member.user.id}>`)
            if (!client.tools.isEmptyString(message)) {
                let cachedChannel = await client.channels.cache.get(config.channels.member_log_channel.id)
                if (cachedChannel) {
                    client.tools.sendEmbed(cachedChannel, {
                        title: "Member Joined",
                        description: message,
                        color: "GREEN"
                    })
                }
            }
        }
    }

    if (config.join_dm.enabled) {
        try {
            let replaceAll = client.tools.replaceAll;
            let message = config.join_dm.message
            message = replaceAll(message, "{username}", member.user.username)
            message = replaceAll(message, "{discriminator}", member.user.discriminator)
            message = replaceAll(message, "{servername}", member.guild.name)
            message = replaceAll(message, "{user_mention}", `<@!${member.user.id}>`)
            if (!client.tools.isEmptyString(message)) {
                client.tools.generateEmbedAsync({
                    title: "Welcome at: " + member.guild.name,
                    description: message,
                    color: "BLUE"
                }).then(embed => {
                    try {
                        member.user.send(embed)
                    } catch (err) {
                        client.logger.error(err)
                    }
                })
            }
        } catch (error) {
            client.logger.error(error)
        }
    }


    if (config.channels.member_log_channel.enabled) {
        let cachedChannel = await client.channels.cache.get(config.channels.event_log_channel.id)
        if (cachedChannel) {
            client.tools.sendEmbed(cachedChannel, {
                title: `[MEMBER JOIN]`,
                description: "User: " + member.user.username + " hopped into the server.",
                color: "GREEN",
                thumbnail: member.user.displayAvatarURL()
            })
        }
    }

    client.logger.debug("[MEMBER JOIN] >> User: " + member.user.username + " hopped into the server.")
}