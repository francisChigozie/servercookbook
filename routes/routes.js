const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Exercise = require('../models/exercise')
const Todo = require('../models/todo')
const todo = require('../models/todo')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response) =>{
    console.log(request.body)

   const saltPassword = await bcrypt.genSalt(10)
   const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    try {
        const {password} = securePassword
       const signUpUser = await User.create(request.body)

         /*const signUpUser = await new User({
             firstName: request.body.firstName,
             lastName: request.body.lastName,
             email: request.body.email,
             occupation: request.body.occupation,
             city: request.body.city,
             password: securePassword,
         })*/

        response.json(signUpUser)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})

// get all users
router.get('/users', async (request, response) =>{
    try {
        const user = await User.find(request.body)
        response.json(user)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})

//make a login(user)
router.get('/users/', async (request,response) =>{
    try{
     const userLogin = await User.findOne({firstName:request.body})
    }
    catch(err){console.error(err.message)}
})

//------Exercise Section-------

router.post('/exercise', async (request, response) =>{
    console.log(request.body)
    try {
        const createExercise = await Exercise.create(request.body)
        response.json(createExercise)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})

//READ EXERCISE (get all users)

router.get('/exercises', async (request, response) =>{
    try {
        const exercise = await Exercise.find(request.body)
        response.json(exercise)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})
 
//DELETE EXERCISE

router.route('/:id').delete((req, res) => {
     try {
        Exercise.findByIdAndDelete(req.params.id)
        response.json('exercise deleted.')
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }

   /* Exercise.findByIdAndDelete(req.params.id)
    .then(() => ress.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error:') + err);*/

});

// UPDATE EXERCISE

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.firstName = req.body.firstName;
        exercise.description = req.body.description;
        exercise.duration = req.body.duration;
        exercise.date = Date.parse(req.body.date);
    })
    exercise.save()
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error:' + err));
});

//*******TODO*******/

router.post('/todo', async (req, res) =>{
    console.log(req.body)
    try {
        const cookTodo = await Todo.create(req.body)
        res.json(cookTodo)
    } catch (error) {
        console.log(err)
        res.sendStatus(500)
    }
})

// READ TODO

router.get('/todos', async (req, res) =>{
    try {
        const cookTodo = await Todo.find(req.body)
        res.json(cookTodo)
    } catch (error) {
        console.log(err)
        res.sendStatus(500)
    }
})

// delete
router.route('todos/:id').delete( async (req,res) => {
    try{
   const {id} = req.params;
   const {description} = req.body;
   const deleteTodo = await todo.delete(
       {descriptio: req.body});
       res.json("Todo was deleted!");
    }
    catch(err) { console.log(err.message);}
})

module.exports = router;