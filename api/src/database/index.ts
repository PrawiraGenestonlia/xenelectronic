import { Connection, createConnection } from 'typeorm';
import { seeding } from './seeding';
import dotenv from 'dotenv';

dotenv.config({});
class Database {

  public connection: Connection;

  constructor() {
    this.connectToDB();
  }

  public async connectToDB(): Promise<void> {
    if (!this.connection) {
      const _con = await createConnection({
        type: envString('postgres', 'sqlite'),
        database: process.env.SEEDING_TEST === '1' ? './db.seeding.sqlite' : envString(process.env.DATABASE_NAME || '', './db.sqlite'),
        url: envString(process.env.DATABASE_URL || '', ''),
        entities: [
          __dirname + '/entity/*.ts',
          __dirname + '/entity/*.js'
        ],
        synchronize: true,
        logging: false,
        extra: {
          ssl: {
            rejectUnauthorized: false
          }
        }
      }).catch(console.error);
      if (_con) {
        this.connection = _con;
        console.log('Connected to db!!');
        if (process.env.NODE_ENV !== 'test') {
          seeding();
        }
      }
    }
  }

}


function envString<T>(prodString: T, devString: T): T {
  return process.env.NODE_ENV === 'production' ? prodString : devString
}

export const db = new Database();