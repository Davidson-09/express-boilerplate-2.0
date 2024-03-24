import { Db, MongoClient } from "mongodb";
import logger from "./logger";
import dotenv from 'dotenv'
dotenv.config();

const mongodbUri: string= process.env.MONGODB_URI as string;

export async function connectToDb():Promise<MongoClient>{
    try{
        const client = await MongoClient.connect(mongodbUri)
        logger.info("Connected to db successfully");
        return client
    }catch(e){
        logger.error("Could not connect to db");
        process.exit(1);
    }
}