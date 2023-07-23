const mysql = require('mysql2/promise');

// MySQL database configuration
const config = {
  host: 'localhost',
  user: 'root',
  password: 'H0l1dayz',
  database: 'leave_buddy'
};

// Employee data
const employee = {
  name: 'Wanang Alang',
  ID: 54321,
  startDate: '2022-12-10',
  entitlement: 10,
  leaveArr: JSON.stringify(Array(365).fill(0)),
  balance: 0.00
};



// Insert employee record
async function insertEmployee() {
  try {
    // Create MySQL connection
    const connection = await mysql.createConnection(config);
    // Insert employee record
    const result = await connection.execute(
      'INSERT INTO employees (name, ID, startDate, entitlement, leaveArr, balance) VALUES (?, ?, ?, ?, ?, ?)',
      [
        employee.name,
        employee.ID,
        employee.startDate,
        employee.entitlement,
        employee.leaveArr,
        employee.balance
      ]
    );
    console.log(`Inserted ${result[0].affectedRows} row(s)`);
    // Close MySQL connection
    await connection.end();
  } catch (err) {
    console.error(err);
  }
}

// Call insertEmployee function
insertEmployee();
