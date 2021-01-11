import { createConnection } from 'typeorm';

export const databaseProviders = [
         {
           provide: 'A_LOCAL_CONNECTION',
           useFactory: async () =>
             await createConnection({
               type: 'mysql',
               host: '127.0.0.1',
               port: 3306,
               username: 'waso_user',
               password: 'WasoUser1.$$',
               database: 'waso_db',
               entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
               synchronize: true,
             }),
         },
        //  {
        //    provide: 'A_LOCAL_CONNECTION',
        //    useFactory: async () =>
        //      await createConnection({
        //        type: 'mysql',
        //        host: 'localhost',
        //        port: 3306,
        //        username: 'root',
        //        password: '',
        //        database: 'waso_db',
        //        entities: [__dirname + '/../**/local/*.entity{.ts,.js}'],
        //        synchronize: true,
        //      }),
        //  },
         {
           provide: 'EXTERNAL_CONNECTION',
           useFactory: async () =>
             await createConnection({
               type: 'mssql',
               host: '190.113.88.111', // IP Server DB - instancia
               port: 65010, // Puerto defecto SQLEXPRESS: 49170
               username: 'servicios', // User DB
               password: 'AQ@s3r.20#', // Password DB
               database: 'SAE80Empre01', // Name DB
               entities: [__dirname + '/../**/external/*.entity{.ts,.js}'],
               options: {
                 enableArithAbort: true,
                 encrypt: true,
               },
               synchronize: false,
             }),
         }
       ];
