import { createConnection } from 'typeorm';

export const databaseProviders = [
         {
           provide: 'A_LOCAL_CONNECTION',
           useFactory: async () =>
             await createConnection({
               type: 'mysql',
               host: 'localhost',
               port: 3306,
               username: 'root',
               password: '',
               database: 'waso_db',
               entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
               synchronize: true,
             }),
         },
        //  {
        //    provide: 'EXTERNAL_CONNECTION',
        //    useFactory: async () =>
        //      await createConnection({
        //        type: 'mssql',
        //        host: 'DESKTOP-B87I4LC', // IP Server DB
        //        port: 49170,
        //        username: 'waso_user', // User DB
        //        password: 'waso_admin', // Password DB
        //        database: 'erp_aquasistemas', // Name DB
        //        entities: [__dirname + '/../**/external/*.entity{.ts,.js}'],
        //        options: {
        //          enableArithAbort: true,
        //          encrypt: true,
        //        },
        //        synchronize: true,
        //      }),
        //  },
         //  {
         //    provide: 'EXTERNAL_CONNECTION',
         //    useFactory: async () =>
         //      await createConnection({
         //        type: 'mysql',
         //        host: 'localhost',
         //        port: 3306,
         //        username: 'root',
         //        password: '',
         //        database: 'erp_aquasistemas',
         //        entities: [__dirname + '/../**/external/*.entity{.ts,.js}'],
         //        synchronize: true,
         //      }),
         //  },
       ];
