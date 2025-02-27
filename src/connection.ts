import { Client } from 'pg';

const client = new Client({
    user: 'postgres', // change this to your postgres username
    password: 'password', // change this to your postgres password
    host: 'localhost',
    database: 'employee_db', // change this to your postgres database
    port: 5432
});

export default client;
