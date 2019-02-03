const express = require('express');
const app = express();

const courses = [
    {id: 1, name: "Node.js"},
    {id: 2, name: "Angular"},
    {id: 3, name: "ReactJS"}
]
app.get("/", (req, res) =>{
    res.send("Hello, World!");
});

app.get("/api/courses", (req, res) =>{
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id == req.params.id);
    if(!course) res.status(404).send("The Course with given ID was not found!");
    res.send(course);
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${port}...`))