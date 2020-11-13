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

module.exports.run = async (client, message, args) => {

    const Discord = client.modules["discord.js"]

    try {





    } catch (err) {
        client.logger.error("Error in Template Command.", err)
        let errorEmbed = new Discord.MessageEmbed()
        errorEmbed.setTitle("Ooops!")
        errorEmbed.setDescription("Error in Command: Template")
        errorEmbed.setColor("#ffff")
        try {
            message.channel.send(errorEmbed)
        } catch (err) {}
    }

}

module.exports.aliases = [
    "alias1",
    "alias2"
]