// Bot utilities
const Discord = require(`discord.js`);
const mysql = require(`mysql`);

const client = new Discord.Client();

const config = require(`./config.json`);
const db = require(`./database.json`);
const rich = require(`./richpresence.json`);

var date = new Date();
var fulldate = date.getDate()+'/'+(date.getMonth()+1)+'/'+ date.getFullYear();
var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var dateandhours = fulldate+' at '+hours;
var timestamp = Math.round(date / 1000);

client.config = config;
client.db = db;
client.rich = rich;

// Database connexion
const dbconnexion = mysql.createConnection({
    host     : db.hostname,
    user     : db.username,
    password : db.password,
    database : db.database,
});

dbconnexion.connect((err) => {
    if(err){
        throw err;
    }
    console.log(`MySql Connected...`);
});


// Start bot
client.on(`ready`, () => {
  console.log(`Bot start: ${dateandhours} (${timestamp})`); // Message dans la console pour valider que le bot est allumer.
  client.user.setPresence(
  {
    status: config.status,
    game:
    {
      type: rich.precense_status,
      name: rich.precense_text,
      url: rich.precense_url,
    }
  });
});


// Bot core
client.on(`message`, message => {
  const dmchannel = client.channels.cache.get(config.idchannel);
  const ideacontent = message.content.replace(/"/gi, `”`); // si nous ne faisons pas ça alors le bot crash si qql met `Mon idée c'est " blablabla`
  const ideacontent2 = ideacontent.replace(/`/gi, `”`); // si nous ne faisons pas ça alors le bot crash si qql met `Mon idée c'est " blablabla`
  const username = message.author.username.replace(/"/gi, `”`);
  var validation_time_ms = Math.round(config.validation_time * 1000)

  let ideainsert = `INSERT INTO ${db.table} (${db.column_pseudo}, ${db.column_idea}, ${db.column_date}) VALUES ("${username}", "${ideacontent2}", "${timestamp}")`;

  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      if(message.content == `oui` || message.content == `OUI` || message.content == `Oui` || message.content == `OUi` || message.content == `OuI` || message.content == `oUI` || message.content == `oUi` || message.content == `ouI`) return;
      message.channel.send(`Confirmez-vous votre envoi ? Si oui, répondez \`Oui\` à la suite de ce message. Vous avez \``+config.validation_time+`\` secondes pour confirmer.`)
        .then(() => {
            message.channel.awaitMessages(response => (response.content == `oui` || response.content == `OUI` || response.content == `Oui` || response.content == `OUi` || response.content == `OuI` || response.content == `oUI` || response.content == `oUi` || response.content == `ouI`), {
            max: 1,
            time: validation_time_ms,
          })
        .then((collected) => {
            message.channel.send(`Votre idée a été envoyé (${collected.first().content}):\n\`\`\`${ideacontent2}\`\`\``);
            dmchannel.send(`Idée reçue de ${message.author}, Merci de voter via ${config.reaction1} ou ${config.reaction2}.\n\`\`\`${ideacontent2}\`\`\`\n\n`).then(function (message) {
              message.react(config.reaction1);
              setTimeout(function() {message.react(config.reaction2);}, 2000);
            }
          );
        let query = dbconnexion.query(ideainsert,(err, result) => {
          if(err){ 
            throw err;}
              //console.log(result); //Debug 
            });
          })
        .catch(() => {
            message.channel.send(`Vous n\'avez pas confirmé votre idée, celle-ci a été annulée.`);
          });
        });
      }
  if (message.channel.bot) return;
});

// Bot login
client.login(config.token);
