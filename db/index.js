const mysql = require("mysql");

const dbConfig = {
  host: '217.21.84.103',
  user: 'u199752113_root',
  password: 'Akshat@5346',
  database: 'u199752113_task',
};

var db;
function handleDisconnect() {
    db = mysql.createConnection(dbConfig);  // Recreate the connection, since the old one cannot be reused.
    db.connect( function onConnect(err) {   // The server is either down
        if (err) {                                  // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 10000);    // We introduce a delay before attempting to reconnect,
        } else {
          console.log('DB connected')
        }                                       // to avoid a hot loop, and to allow our node script to
    });                                             // process asynchronous requests in the meantime.
                                                    // If you're also serving http, display a 503 error.
    db.on('error', function onError(err) {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST' || err.code == 'ECONNRESET') {   // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                        // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
handleDisconnect();


module.exports = db;
