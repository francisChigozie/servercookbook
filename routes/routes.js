const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Exercise = require('../models/exercise')
const Todo = require('../models/todo')
const Mail = require('../models/mail')
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
//Create exercises

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

//Read all exercises of the users)

router.get('/exercises', async (request, response) =>{
    try {
        const exercise = await Exercise.find(request.body)
        response.json(exercise)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
})
 
//Get one exercise
router.get('/exercises/:id', async (request, response) =>{
       try {
        const exercise = await Exercise.findById(request.params.id)
        response.json(exercise)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
});

router.delete('/exercises/:id', async (request, response) =>{
       try {
        const exercise = await Exercise.findByIdAndDelete(request.params.id)
        response.json('Exercise deleted.')
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
});

// UPDATE EXERCISE
router.put('/exercises/update/:id', async (request, response) =>{
    try {
        var query = {"_id": request.params.id};
        var update = request.body;
        var options = {new: true};
        Exercise.findOneAndUpdate(query, update, options, function(err, updatedExercise) {
            if (err) {
                console.log('got an error');
            }
            response.send(updatedExercise)
        })
    } catch(err) {console.log(err)}

})    
//*******TODO*******/
//Create todos

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

// Read todos

router.get('/todos', async (req, res) =>{
    try {
        const cookTodo = await Todo.find(req.body)
        res.json(cookTodo)
    } catch (error) {
        console.log(err)
        res.sendStatus(500)
    }
})

// Get one todos

router.get('/todos/:id', async (request, response) =>{
       try {
        const todo = await Todo.findById(request.params.id)
        response.json(todo)
    } catch (error) {
        console.log(err)
        response.sendStatus(500)
    }
});

// Update todos

router.put('/todos/update/:id', async (request, response) =>{
    try {
        var query = {"_id": request.params.id};
        var update = request.body;
        var options = {new: true};
        Todo.findOneAndUpdate(query, update, options, function(err, updatedTodo) {
            if (err) {
                console.log('got an error');
            }
            response.send(updatedTodo)
        })
    } catch(err) {console.log(err)}

})    
// Delete todos

router.delete('/todos/:id', async (req, res) =>{
       try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        res.json('Todos deleted.')
    } catch (error) {
        console.log(err)
        res.sendStatus(500)
    }
});

//SEND MAIL
router.post('/mail', async (req, res) =>{
    console.log(req.body)
    try {
        const createMail = await Mail.create(req.body)
        res.json(createMail)
    } catch (error) {
        console.log(err)
        res.sendStatus(500)
    }
})


module.exports = router;