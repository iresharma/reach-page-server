import {MongoClient} from "mongodb";

const url = process.env.DATABASE_URL;

export const client = new MongoClient(url);
export const db = client.db("reach-io-primary");

export const pages = db.collection("page")
