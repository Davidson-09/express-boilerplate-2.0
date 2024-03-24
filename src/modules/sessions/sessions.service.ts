import bcrypt from 'bcrypt'
import logger from "../../utils/logger";
import {connectToDb} from '../../utils/db';
import { Db } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();
import jwt, { Secret } from 'jsonwebtoken'
import { Login } from '../users/users.types';

const dbName = process.env.DB_NAME


export async function createNewSession (user:Login): Promise<{accessToken: string, refreshToken:string}>{
    const dbClient = await connectToDb()
    const db: Db = dbClient.db(dbName)

    const refreshToken = jwt.sign({userId: user._id?.toString()}, process.env.RERESH_TOKEN_SECRET as Secret)
    const accessToken = jwt.sign({userId: user._id?.toString()}, process.env.ACCESS_TOKEN_SECRET as Secret, {expiresIn:'10m'})
    const tokens = {accessToken, refreshToken}
    try{
        await db.collection('sessions').insertOne(tokens)
    } catch(e){
        logger.error('Session creation error:', e)
        throw new Error("Could not create new session")
    } finally{
        await dbClient.close()
    }
    return tokens
}