const { events, search } = require("node-albion-api")
const { Client, RichEmbed } = require("discord.js");

const client = new Client();

let lastKiller;
let lastVictim

let guild;

client.login("NjMyNzMxOTkxNjQ5MDI2MDY4.XaJ1ew.5k1c2J5uhi5NbWSE-0AbeEzubFQ");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message',  message => {
    if (message.content === "last kill"){
        getLastKill().then(() => {
            const embed = new RichEmbed()
                .setTitle('Ultima kill')
                .setColor(0x00EAFF)
                .addField("killer:", lastKiller.Name)
                .addField("Victim", lastVictim.Name);
            message.channel.sendMessage(embed);
        }).catch( () => {
            console.log("error");
        });
        
    }
});

async function getLastKill(){
    await events()
    .then((results) => {
        lastKiller = results[0].Killer;
        lastVictim = results[0].Victim;
        console.log(lastKiller.Name);
        console.log(lastVictim.Name);
        return(0);
    }).catch(() => {
        console.log("error");
    });

}