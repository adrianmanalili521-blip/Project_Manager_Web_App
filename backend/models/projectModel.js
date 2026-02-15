const db = require('../db');

// Get all projects
exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM projects");
  return rows;
};

// Get one project by id
exports.getById = async (id) => {
  const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [id]);
  return rows[0];
};

// Create project
exports.create = async (data) => {
  const { title, description, peopleCount, dateCreate, dueDate, taskCount, tasktotal, difficulty, status } = data;
  const [result] = await db.query(
    `INSERT INTO projects 
    (title, description, peopleCount, dateCreate, dueDate, taskCount, tasktotal, difficulty, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, peopleCount, dateCreate, dueDate, taskCount, tasktotal, difficulty, status]
  );
  return { id: result.insertId, ...data };
};


// Get total number of projects
exports.getTotalCount = async () => {
  const [rows] = await db.query("SELECT COUNT(*) AS totalProjects FROM projects");
  return rows[0]; // { totalProjects: 10 }
};

// Get count of projects grouped by status
exports.getStatusCounts = async () => {
  const [rows] = await db.query(`
    SELECT status, COUNT(*) AS count
    FROM projects
    GROUP BY status
  `);
  
  // Convert result to an object for easier frontend use
  const counts = { in_progress: 0, overdue: 0, completed: 0 };
  rows.forEach(row => {
    counts[row.status] = row.count;
  });

  console.log("hello");
  return counts; // e.g. { in_progress: 5, overdue: 2, completed: 3 }
};

// Delete project by id
exports.deleteById = async (id) => {
  const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);
  return result.affectedRows; // Return number of rows deleted
};

// Update project by id
exports.updateById = async (id, data) => {
  const { title, description, peopleCount, dateCreate, dueDate, taskCount, tasktotal, difficulty, status } = data;
  const [result] = await db.query(
    `UPDATE projects 
     SET title = ?, description = ?, peopleCount = ?, dateCreate = ?, dueDate = ?, taskCount = ?, tasktotal = ?, difficulty = ?, status = ?
     WHERE id = ?`,
    [title, description, peopleCount, dateCreate, dueDate, taskCount, tasktotal, difficulty, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, ...data };
};
