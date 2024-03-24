import bcrypt from 'bcrypt'
import logger from "../../utils/logger";
import {connectToDb} from '../../utils/db';
import { Db } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();
import jwt, { Secret } from 'jsonwebtoken'

const dbName = process.env.DB_NAME