# DiscordBot JS Template ( A NodeJS / discord.js Discord Bot Template )

---

#### This is a Discordbot Template wich includes a Command / Event Handler and caching modules for better performance aswell.

---

### You ever wanted a own Discord Bot ? Here we go here you have a Discordbot Template written in NodeJS :P Feel free to edit it like you need it :P

---

#### Creating the application:

- 1. Visit the [Discord Developer Portal](https://discord.com/developers/applications/)
- 2. Click the Button "New Apllication"
- 3. Open the overview of the application and click at the tab > "Bot" at the left. Then click "Add Bot" Button.
- 4. Now you have an application with a Bot user :P
- 5. Copy the Token wich you can find in the center of the bot ovreview.

#### Installing NodeJS

Depending on your System follow the steps at [NodeJS.ORG](https://nodejs.org/en/)

- 7.  If you have the latest version of nodejs installed, update the node package manager by using the command `npm install -g npm`

- 8.  After that clone the repository and initialize

#### Clone reppo and init Project

- 7. Follow these steps:

  - 1. Clone The repository `git clone https://github.com/depascaldc/DiscordBot-JS-Template`
  - 2. Change into the Folder `cd DiscordBot-JS-Template`
  - 3. Install required dependencies `npm install`

- 8. Paste the Token into the configuration folder `./confis/credentials.json`

```json
{
  "client_token": "<Paste_Token_here>"
}
```

- 10. after that you can go to the general config `./config/general.json` to setup things like `prefix, channelID's, messages, guildID`
  - 1. REQUIRED Arguments:
  - - 1. `prefix`
  - - 2. `guild_id`
  - 2. If you forgot any arguments the bot does not work just check the config again

---

#### Run your cool new and fancy Discordbot

- 1. Use the command `pm2 start` if you want to use the supported processmanager

  - If you want to see the bot logs run `pm2 dash` or `pm2 logs`

- 2. or you can use the command `node client.js` ( Keep the node console active or the bot logs out :P )

---

#### I need HELP!!!

- If you need any help with the configuration join my [Discord Server](https://discord.gg/Hjymztg5rR)

<div style="background:#333; border-radius:10px; padding:30px;" align="center">
    <a style="color:#00ff00" target="_blank" href="https://github.com/depascaldc/"><img src="https://img.shields.io/github/followers/depascaldc?label=GitHub%20Followers&logo=GitHub&logoColor=%23ffffff&style=flat-square"></img></a>
    <a style="color:#00ff00" target="_blank" href="https://discord.gg/Hjymztg5rR"><img src="https://img.shields.io/discord/776519121147527210?label=depascaldc.xyz%20Discord&logo=Discord&logoColor=%23ffffff&style=flat-square"></img></a>
    <a style="color:#00ff00" target="_blank" href="https://www.paypal.com/paypalme/depascaldc"><img src="https://img.shields.io/static/v1?label=Donate%20Via%20Paypal&message=paypal&style=flat-square&logo=paypal&color=lightgrey"></img></a>
</div>
