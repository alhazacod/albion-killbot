const { events, search } = require("node-albion-api");
const itemData = require ("./ItemData");
const { Client, RichEmbed } = require("discord.js");

const client = new Client();

let lastKiller;
let lastkillerWeapon;
let lastVictim;

let guild;



client.login("NjMyNzMxOTkxNjQ5MDI2MDY4.XaKiCA.s02GkprG8Eo9Se0C0FQAXXmBLhM");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

getLastKill();

client.on('message',  message => {
    if (message.content === "last kill"){
        getLastKill().then(() => {
            getItemName().then(() => {
                const embed = new RichEmbed()
                .setTitle('Ultima kill')
                .setColor(0x00EAFF)
                .addField("Asesino:", lastKiller.Name)
                .addField("Victima", lastVictim.Name)
                .addField("Arma del asesino", lastkillerWeapon)
                .setThumbnail(`https://gameinfo.albiononline.com/api/gameinfo/items/${lastKiller.Equipment.MainHand.Type}`)
                message.channel.send(embed);
            });
            
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
    })
    .catch(err => {
        console.log(err);
        return 0;
    });

}

async function getItemName(){
    await itemData(lastKiller.Equipment.MainHand.Type)
    .then( item => {
        lastkillerWeapon = item.localizedNames["ES-ES"];
    }).catch( err => {
        console.log(err);
        return 0;
    });
}