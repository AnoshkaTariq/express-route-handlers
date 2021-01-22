const Joi = require('joi');
const express = require('express');
const router = express.Router();
const debug = require('debug')('app:startup');
// const morgan = require('morgan');


const courses = [
    { id: 1, name: 'JS Basics' },
    { id: 2, name: 'OOP' },
    { id: 3, name: 'Algo + DS' },
    { id: 4, name: 'Node' },
    { id: 5, name: 'React' }
];

// get all courses
router.get('', (req, res) => {
    res.send(courses);
    // res.send(req.query);
});

// get a specific course using id
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id is not found');
    res.send(course);
});


// post request with mannual validation
// router.post('', (req, res) => {
//     if (!req.body.name || req.body.name.length < 3) {
//         res.status(400).send('Name is required and should be a minimum of 3 characters');
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }

//     courses.push(course);
//     res.send(course);
// });

// post request with validation using Joi
router.post('', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    return res.send(course);
});

// put(update) request on a specific id
router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id is not found.');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    return res.send(course);
});

// delete course of a specific id
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    debug(course);
    if (!course) return res.status(404).send('The course with the given id is not found.');

    const index = courses.indexOf(course);
    debug(index);
    debug(courses.splice(index, 1));
    return res.send(course);
});

// Validation logic in one function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(course);
}

module.exports = router;