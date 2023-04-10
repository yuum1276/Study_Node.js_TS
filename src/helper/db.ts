import * as mysql from 'mysql2/promise';

// Connections
export async function dbConnection() {
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dbal3326@@',
  });

  connection
    .connect()
    .then(() =>
      connection.query<mysql.RowDataPacket[]>('SELECT 1 + 1 AS solution')
    )
    .then(([rows, fields]) => {
      console.log('The solution is: ', rows[0]['solution']);
    });
}

dbConnection();

export default dbConnection;
