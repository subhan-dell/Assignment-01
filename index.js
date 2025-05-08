const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Data store
let tasks = [];
let currentId = 1;

// Routes

// Home - List tasks
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add task
app.post('/addTask', (req, res) => {
    const taskName = req.body.taskName;
    if (taskName) {
        tasks.push({ id: currentId++, taskName });
    }
    res.redirect('/');
});

// Delete task
app.delete('/task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
