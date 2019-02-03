const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  { id: 1, name: "Node.js" },
  { id: 2, name: "Angular" },
  { id: 3, name: "ReactJS" }
];
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) res.status(404).send("The Course with given ID was not found!");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = courseValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course)
    return res.status(404).send("The course with given ID was not Found!");

  const { error } = courseValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course)
    return res.status(404).send("The Course with Given ID was not Fond!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
function courseValidate(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${port}...`));
