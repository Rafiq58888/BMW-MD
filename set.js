const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZOMUZxdkx1QllwTEJNem0xOUV0L0lnNTF6WGdaRlNSSStka2Z5VlVucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUYzSW02QnNDcjdKeEk5VUY4SkJJMHczcnVNNlJDdHNFbG5IQU9WL0tSUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQjNvNFVFWlVGSGJIN3lYbkRuS1hyOEZsZEQ4MG0xTmEvRENPTlg0bW13PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxeER2Yi90ZTlleVZRTGFIU3dFSThFQmkrZC81MmJsTEFTSmtpcys1MFhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHQnBjNmRiNzNja3BIeHZYQXJua3l3akJrU2F2VTdaK3ZOZUJlWmZQWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlCejVaeEFFSHBSbStqUUpBdktCVUw5ZytFcFZPYlNoTTNTbHY4MzdxRkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxOZ1drTmFLWEh6YjYzdWpLQUorUGV2cFNqWEk4TFJ5di8vREZhM1UyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXNjTkVoeUhMNXFqSnhnVG9kSk1aUElEK2pnK3NnSlErLy8zbTQvbFlBVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdmeGlPbkFVVW8zRVBUK0ppMmZBT3RwUzNtS1NXYUZGcG5jQkMwekErYVRZQTU3ZFJsOGRCazhpdDBFNzBVem5YWDFrWnBVN0pWb29jTDc4V1hST2lBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI0LCJhZHZTZWNyZXRLZXkiOiJsWmRKRXpTNStLbW9GMUtJdFhBaDVBNWN6WWVtdFh3WFJwdVlmdWFlbW1ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKUll5eWRXUVMtR3FTMGgyQ0ZoYlJnIiwicGhvbmVJZCI6Ijk1NzJiNjY2LTUxNjAtNDJmMy1iN2YxLTUyYzAyMWJiOTRkNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1aG5ESWdzWG1EMkczL1Q1TGxRNDBPL3o0cHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMUdyU2xQTWl3NWoyY29FaCtEUnY4c2NqYnhNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlBUzlXUU02IiwibWUiOnsiaWQiOiI5MjM0MDU0NTI2NTg6NjJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01iS2l2TUJFTDJiazdRR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikdic2JHdWJLeE9FZE5HZjJ4RGNiNGh6Tkhlemk3MU9Vek9UbUVHNFFNRG89IiwiYWNjb3VudFNpZ25hdHVyZSI6InVxVlhNSWVkaHB5cnJEelhxTEw3NFh6SitRU2gxbDk1NFl0ejBvNUZaakxFbjM4TjR2Mjd3eEJ1Si9NVE1MditWQkh4R21aaDJSejhtOURDVTAxSkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJwSDhqWjcrNzZRbTI5cXBCRHEvQSswL0RGR00zTlNKeGM1OUxOTWFTQ1ZWb1JMdUZ6MnQvcGJoSkowVUNDV1BNNmVQK09JLzY4Tnllc3ZFWnFhSk5nUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQwNTQ1MjY1ODo2MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSbTdHeHJteXNUaEhUUm45c1EzRytJY3pSM3M0dTlUbE16azVoQnVFREE2In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5OTc5NDY2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUkxOSJ9',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW_XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
