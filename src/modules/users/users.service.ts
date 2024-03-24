import bcrypt from 'bcrypt'
import { AccountStatus, CreateUser, Login, User } from './users.types';
import logger from "../../utils/logger";
import {connectToDb} from '../../utils/db';
import { Db } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();
import jwt, { Secret } from 'jsonwebtoken'

const dbName = process.env.DB_NAME

export async function createUser(user: CreateUser): Promise<User>{
  const dbClient = await connectToDb()
  const db: Db = dbClient.db(dbName)
  try{
    // hash password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(user.password, salt)
    const newUser:CreateUser = {...user, verified: false, status:AccountStatus.Active}
    newUser.password = hashedPassword
    // store the user in mongodb
    await db.collection('users').insertOne(newUser)
    const { password, ...rest } = newUser;
    return rest
  } catch(e){
    logger.error('user creation error:', e)
    throw new Error('Could not create user')
  }finally{
    await dbClient.close()
  }
}

export async function userExists(email: string):Promise<boolean>{
  const dbClient = await connectToDb()
  const db: Db = dbClient.db(dbName)

  try{
    // check if user already exists
    const existingAccounts: number = await db.collection('users').countDocuments({email: email})
    return existingAccounts > 0
  }finally{
    await dbClient.close()
  }
  
}

export async function getUsers() {
  return { message: "Users fetched successfully" };
}

export async function getSingleUserWithEmail(email: string): Promise<Login|null> {
  const dbClient = await connectToDb()
  const db: Db = dbClient.db(dbName)

  try{
    const user:Login = await db.collection('users').findOne({email}) as unknown as Login
    return user
  }catch(e){
    logger.error('Error getting user with email:', e)
    throw new Error("Could not reterieve user data.")
  }finally{
    await dbClient.close()
  }
}

export async function authenticateUser(
  {
    providedPassword,
    userPassword
  }:{
    providedPassword:string,
    userPassword:string
  }):Promise<boolean>{
  try{
    return bcrypt.compare(providedPassword, userPassword)
  }catch(e){
    logger.error('Error authenticating user:', e)
    throw new Error("Could authenticate user")
  }
}