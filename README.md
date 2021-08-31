# IdeaBot
Just send an mp to your bot to send your idea to the channel predefined in config.json.

* [Donation Paypal](https://paypal.me/bybesports)

## Built With

* [SublimeText 3](https://www.sublimetext.com/) - Used to code the whole project.
* [Discord.js (Version: latest)](https://discord.js.org/#/).
* [NodeJS (Version: latest)](https://nodejs.org/en/).

## Authors

* **PandaxCSGO** - *Initial work* - [Social Media](https://linktr.ee/PandaxCSGO)
* **Badiiix** - *Help MYSQL integration* - [Twitter](https://twitter.com/BadiiiX_IT)

## Special Thanks

* **CraftMyWebsite Staff ([Florentlife](https://twitter.com/florentlife_) - [Emilien52](https://twitter.com/Emilien52_eng))** - *For using this project* - [Website](https://craftmywebsite.fr)
* **PinglsDzn** - *Report bug* - [Github](https://github.com/PinglsDzn) / [Twitter](https://twitter.com/PinglsDzn)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

## How to install in your server

# Install locally

Local hosting of IdeaBot is also possible. First, you will need [`Node.JS`](https://nodejs.org/en/download/package-manager/).

Clone the repo:

```console
$ git clone https://github.com/PandaxCSGO/IdeaBot/
$ cd IdeaBot
```

Install dependencies:

```console
$ npm install
```
Edit the `config.json` file, choose the status:
`dnd` for `do not disturb`
`online` for `online`
`idle` for `inactive`
`inivisible` for `invisible`

Enter your token in place of `YourTokenBot`.

Enter the id of the channel where the ideas will go when sent to the bot instead of `YouridChannelForIdea`

Modify the `bdd.json` file to add your database information

Install pm2:

```console
$ npm install pm2
```

Finally, start Modmail.

```console
$ pm2 start index.js
```

## Server using this project

* **CraftMyWebsite** [Website](https://craftmywebsite.fr) / [Discord](https://discord.gg/wMVAeug)
* **Send me an email for add your server** {contact@bybesports.com}>
