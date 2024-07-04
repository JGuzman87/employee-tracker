const inquirer = require('inquire');
const { Pool } = requiere('pg');

const pool = new Pool (
    {
        user: 'postgres',
        password: 'Pa$$word',
        host: 'localhost',
        database: 'employees_db'
    },
)
pool.connect();

inquirer
.prompt([
    {
        
    }
])

