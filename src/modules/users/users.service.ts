import bcrypt from 'bcrypt'
import { AccountStatus, CreateUser, User } from './users.types';
import logger from "../../utils/logger";
import {connectToDb} from '../../utils/db';
import { Db } from 'mongodb';

export async function createUser(user: CreateUser): Promise<User>{
  const dbClient = await connectToDb()
  const db: Db = dbClient.db('book-store')
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
  const db: Db = dbClient.db('book-store')

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

export async function getSingleUser(userId: string) {
  return { userId };
}