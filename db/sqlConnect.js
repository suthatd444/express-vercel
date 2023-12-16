const QueryBuilder = require('node-querybuilder');
const settings = {
    host: 'localhost',
    database: 'myzerrin',
    user: 'root',
    password: '123456'
};
// const settings = {
//     host: 'sql12.freesqldatabase.com',
//     database: 'sql12602394',
//     user: 'sql12602394',
//     password: 'JEqa3UagYU'
// };

const pool = new QueryBuilder(settings, 'mysql', 'pool');
module.exports = pool;
