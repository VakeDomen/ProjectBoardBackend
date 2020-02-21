const sqlite = require("sqlite");
import { DbItem } from '../models/db.item';

const dbConnection: Promise<any> = sqlite.open(process.env.SQLITE_DB, { Promise });

export async function query(query: string): Promise<DbItem[]> {
    const db = await dbConnection;
    console.log(query);
    return db.all(query);
}

export async function fetch(table: string, filter: DbItem): Promise<DbItem[]> {
    return query('SELECT * FROM ' + table + ' WHERE ' + filter.whereString());
}

export async function fetchAll(table: string): Promise<DbItem[]> {
    return query('SELECT * FROM ' + table);
}

export async function insert(table: string, filter: DbItem): Promise<DbItem[]> {
    return query('INSERT INTO ' + table + ' (' + filter.listKeys() + ') VALUES (' + filter.listValues() + ')');
}

export async function update(table: string, filter: DbItem): Promise<DbItem[]> {
    return query('UPDATE ' + table + ' SET ' + filter.valuesToString() + ' WHERE id=\'' + filter.id + '\'');
}
