import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
import dotenv from 'dotenv';
dotenv.config();
const sql = neon('postgresql://PrepPal_owner:xvEG3aLBscr5@ep-cool-feather-a54qzvfu.us-east-2.aws.neon.tech/PrepPal?sslmode=require');
export const db = drizzle(sql,{schema});