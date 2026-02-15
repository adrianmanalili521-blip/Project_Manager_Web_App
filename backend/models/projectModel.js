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
