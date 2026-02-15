require('dotenv').config();
const express = require('express');
const app = express();
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const cors = require('cors');

app.use(cors()); // allow all origins for development

app.use(express.json());

app.use('/projects', projectRoutes);

//app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

