// Create a connection pool
const dbconnection = mysql.createPool({
  host: VARSE.DB_HOST,
  user: VARSE.DB_USER,
  database: VARSE.MYSQL_DB,
  password: VARSE.DB_PASS,
  connectionLimit: 10,
});

// Test the database connection
dbconnection.execute("SELECT 'test'", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database:", res);
  }
});
