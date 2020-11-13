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

const Discord = require("discord.js");

module.exports.isEmptyString = (str) => {
    try {
        return (!str || /^\s*$/.test(str));
    } catch (err) {
        return true
    }
}

module.exports.replaceAll = (str, toReplace, replacement) => {
    return str.split(toReplace).join(replacement)
}

module.exports.randomColor = () => {
    return (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
}

module.exports.sendEmbed = (channel, data, cb) => {
    let embed = new Discord.MessageEmbed()
    if (data.timestamp) {
        embed.setTimestamp(data.timestamp)
    } else {
        if (data.timestamp != false) {
            embed.setTimestamp()
        }
    }
    if (data.title) {
        embed.setTitle(data.title)
    }
    if (data.description) {
        embed.setDescription(data.description)
    }
    if (data.color) {
        embed.setColor(data.color)
    }
    if (data.author) {
        embed.setAuthor(data.author.name, data.author.image)
    } else {
        embed.setAuthor('github.com/depascaldc/DiscordBot-JS-Template')
    }
    if (data.thumbnail) {
        embed.setThumbnail(data.thumbnail)
    }
    if (data.image) {
        embed.setImage(data.image)
    }
    if (data.footer) {
        embed.setFooter(data.footer)
    } else {
        if (data.footer != false) {
            embed.setFooter('github.com/depascaldc/DiscordBot-JS-Template')
        }
    }
    if (data.fields) {
        for (let field of data.fields) {
            if (field.name != "" && field.value != "") {
                embed.addField(field.name, field.value, field.inline)
            } else {
                console.warn("Please don't try to send embed fields with empty title or content as it will throw errors with discord.js. Thrown at tools.js line 149")
            }
        }
    }
    if (data.url) {
        embed.setURL(data.url)
    }
    let msg = channel.send(embed)
    if (cb) {
        cb(msg)
    }
    return msg
}

module.exports.sendEmbedAsync = async (channel, data) => {
    return new Promise((resolve, reject) => {
        try {
            this.generateEmbed(channel, data, async message => {
                resolve(message)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.generateEmbed = (data, cb) => {
    let embed = new Discord.MessageEmbed()
    if (data.timestamp) {
        embed.setTimestamp(data.timestamp)
    } else {
        if (data.timestamp != false) {
            embed.setTimestamp()
        }
    }
    if (data.title) {
        embed.setTitle(data.title)
    }
    if (data.description) {
        embed.setDescription(data.description)
    }
    if (data.color) {
        embed.setColor(data.color)
    }
    if (data.author) {
        embed.setAuthor(data.author.name, data.author.image)
    } else {
        embed.setAuthor('github.com/depascaldc/DiscordBot-JS-Template')
    }
    if (data.thumbnail) {
        embed.setThumbnail(data.thumbnail)
    }
    if (data.image) {
        embed.setImage(data.image)
    }
    if (data.footer) {
        if (typeof data.footer == 'object') {
            embed.setFooter(data.footer.text, data.footer.icon)
        } else {
            embed.setFooter(data.footer)
        }
    } else {
        if (data.footer != false) {
            embed.setFooter('github.com/depascaldc/DiscordBot-JS-Template')
        }
    }
    if (data.url) {
        embed.setURL(data.url)
    }
    if (cb) {
        cb(embed)
    }
    return embed
}

module.exports.generateEmbedAsync = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            this.generateEmbed(data, async embed => {
                resolve(embed)
            })
        } catch (error) {
            reject(error)
        }
    })
}