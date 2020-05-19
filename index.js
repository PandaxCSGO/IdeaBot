// Utilitaire du Bot
const Discord = require(`discord.js`);
const mysql = require(`mysql`);
const client = new Discord.Client();
const config = require(`./config.json`);
const rich = require(`./richpresence.json`);

var date = new Date();
var fulldate = date.getDate()+'/'+(date.getMonth()+1)+'/'+ date.getFullYear();
var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var dateandhours = date+' à '+hours;
var timestamp = Math.round(date / 1000);


client.config = config;
client.rich = rich;

// Connexion DB
const db = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.psw,
    database : config.db,
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log(`MySql Connected...`);
});


// Demarrage du Bot
client.on(`ready`, () => {
  console.log(`Votre bot est bien allumer...`); // Message dans la console pour valider que le bot est allumer.
  console.log(`Nous sommes le `+dateandhours+` (`+timestamp+`)`);
  client.user.setPresence(
  {
    status: "dnd", // Mettre le status du bot. (Vous pouvez mettre `online` | `idle` | `invisible` | `dnd`)
    game:
    {
      type: rich.status, // Mettre l'action (WATCHING | STREAMING | PLAYING | LISTENING).
      name: rich.precense, // Mettre un message personnalisé.
      url: rich.precense_url, // Mettre l'url de la chaine twitch que vous voulez
    }
  });
});


// Image du message (https://bit.ly/CMW-Idées) pour mieux le voir (#Random (pour le salon) est juste un exemple) !
//client.on("guildMemberAdd", (member) => {
    //member.createDM();
    //member.send("Bienvenue sur le Discord de **CraftMyWebsite**.\n\nCraftMyWebsite est un CMS. (Content Management System)\n\nUn site tout fait pour votre serveur minecraft. Il est **rapide**, **totalement responsive** et surtout **GRATUIT** !\nIl est totalement **Open-Source** ce qui permet à n'importe qui avec une base de connaissances de modifier les pages ou de créer des thèmes.\n\nCraftMyWebsite à besoin de vous, proposez vos idées pour les versions à venir.\n\n**Aides**: Afin d'envoyer une idée, merci de me l'envoyer en message priver, Suite à cela votre idée sera envoyer dans <#"+ idchannel +"> pour que la communauté puisse voter.\n(⚠️ **Attention** ⚠️ Même si votre idée est appréciée de la communauté elle ne sera pas forcément mise dans la prochaine version!)\n\nPour proposer votre idée quelques conditions :\n- Écrire en bon français,\n- Accepter que votre pseudo soit public,\n- Proposer qu'une seule idée dans votre message,\n- Être précis et concis dans votre message,\n- Restez rationnel/réaliste dans votre idée.\n\nMerci de votre compréhension et de ne pas spammer vos idées tout abus de ce système sera sanctionné !\n(**PROTIP**: ``SHIFT`` + ``ENTRÉE`` permettent de passer à la ligne sans envoyer le message) \n\n Cordialement, L'équipe CraftMyWebsite.");
//});


// Coeur du bot
client.on(`message`, message => {
  const dmchannel = client.channels.get(config.idchannel);
  const msgcontent = message.content.replace(/"/gi, `”`);

  let sql = `INSERT INTO `+config.table+` (`+config.colone1+`, `+config.colone2+`, date) VALUES ("`+message.author.username+`", "`+msgcontent+`", "`+timestamp+`")`;

  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      if(message.content == `oui` || message.content == `OUI` || message.content == `Oui` || message.content == `OUi` || message.content == `OuI` || message.content == `oUI` || message.content == `oUi` || message.content == `ouI`) return;
      message.channel.send(`Confirmez-vous votre envoi ? Si oui, répondez \`Oui\` à la suite de ce message. Vous avez \`15\` secondes pour confirmer.`)
        .then(() => {
            message.channel.awaitMessages(response => (response.content == `oui` || response.content == `OUI` || response.content == `Oui` || response.content == `OUi` || response.content == `OuI` || response.content == `oUI` || response.content == `oUi` || response.content == `ouI`), {
            max: 1,
            time: 15000,
            errors: ['Oui'],
          })
        .then((collected) => {
            message.channel.send(`Votre idée à été envoyer (${collected.first().content}):\n\`\`\`${msgcontent}\`\`\``);
            dmchannel.send(`Idée reçue de ${message.author}, Merci de voter via `+config.reaction1+` ou `+config.reaction2+`.\n\`\`\`${msgcontent}\`\`\`\n\n`).then(function (message) {
              message.react(config.reaction1);
              setTimeout(function() {message.react(config.reaction2);}, 2000);
            }
          );
        let query = db.query(sql,(err, result) => {
          if(err){ 
            throw err;}
              //console.log(result);
            });
          })
        .catch(() => {
            message.channel.send(`Vous n\'avez pas confirmé votre idée, celle-ci a été annulée.`);
          });
        });
      }
  if (message.channel.bot) return;
});

// TOKEN du Bot
client.login(config.token);