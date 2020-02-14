const sqlite = require("sqlite");
const db = sqlite.open('./database.sqlite');

module.exports.fetch = (table: string, filter: any) => {
    console.log(table, filter);
}