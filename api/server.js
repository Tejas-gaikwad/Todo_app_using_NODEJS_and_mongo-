const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const todo = require('./models/todo');
// const todo = require('./models/todo');

app.get('/todos', async(req, res) => {
    const todos = await todo.find();

    res.json(todos);
});

app.post('/todo1/new',  (req, res) => {
    const todo1 = new todo({
        text : req.body.text
    });

    todo1.save();

    res.json(todo1);
});

app.delete('/todo1/delete/:id', async (req, res) => {
    const result = await todo.findByIdAndDelete(req.params.id);

    res.json({result});   
})

app.get('/todo1/complete/:id', async (req, res) => {
    const todo1 = await todo.findById(req.params.id);
    todo1.complete = !todo1.complete;
    todo1.save();
    res.json(todo1);

})

app.put('/todo1/update/:id', async (req, res) => {
	const todo1 = await todo.findById(req.params.id);

	todo1.text = req.body.text;

	todo1.save();

	res.json(todo1);
});


app.listen(3001, () => console.log("Server started on port 3001"));