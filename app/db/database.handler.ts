const sqlite = require("sqlite");
import { DbItem } from '../models/db.item';

const dbConnection: Promise<any> = sqlite.open('./app/db/sqlite.db', { Promise });

export async function query(query: string): Promise<any> {
    const db = await dbConnection;
    console.log(query);
    return db.all(query);
}

export async function fetch(table: string, filter: any): Promise<any[]> {
    return query('SELECT * FROM ' + table + ' WHERE ' + filter.whereString());
}

export async function fetchAll(table: string): Promise<any[]> {
    return query('SELECT * FROM ' + table);
}

export async function insert(table: string, filter: any): Promise<any[]> {
    return query('INSERT INTO ' + table + ' (' + filter.listKeys() + ') VALUES (' + filter.listValues() + ')');
}
