const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Exercise = require('../models/exercise')
const Todo = require('../models/todo')
const Mail = require('../models/mail')

const sendmail = require('./sendmail.js')
const bcrypt = require('bcrypt')
const { json } = require('express')

router.post('/user', async (request, response) =>{
    console.log(request.body)

   const saltPassword = await bcrypt.genSalt(10)
   const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    try {
        const {password} = securePassword
       const signUpUser = await User.create({
             firstName: request.body.firstName,
             lastName: request.body.lastName,
             email: request.body.email,
             occupation: request.body.occupation,
             city: request.body.city,
             password: securePassword,
         })

        response.json(signUpUser)
    } catch (error) {
        console.log(error)
        response.sendStatus(500)
    }
})
//DElete user
router.delete('/users/:id', async (request, response) =>{
       try {
        const user = await User.findByIdAndDelete(request.params.id)
        response.json('User account deleted.')
    } catch (error) {
        console.log(error)
        response.sendStatus(500)
    }
});

// get all users
router.get('/users', async (request, response) =>{
    try{
     const user = await User.find(request.body, (err, user) => {
        if(err) {
         response.status(500)
         response.send('Error:', err);
       }else if(user[0] === -1) {
         response.send('No user found !');
       }else{
           response.json(user)
       }
    })
         
    }catch(err){
        console.error(err.message)
        response.sendStatus(500)
    } 

   /* try {
        const user = await User.find(request.body)
        response.json(user)
    } catch (error) {
        console.log(error)
        response.sendStatus(500)
    }*/

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
        const createExercise = await Exercise.create({
            firstName: request.body.firstName,
            description: request.body.description,
            duration: request.body.duration
        })
        response.json(createExercise)
    } catch (error) {
        console.log(error)
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

// UPDATE EXERCISE
router.put('/exercises/:id', async(req, res) => {
    const requestedId = req.params.id;
 try{
      const exercise = await Exercise.findOneAndUpdate({where: {id: requestedId},
        firstName : req.body.firstName,
        duration : req.body.duration,
       });
         res.send('exercise updated') ;
         
    }catch (err) { console.error(err.message) } 
      
})
/*router.put(`/exercises/update/:id`, async (request, response) =>{
   try {
        var query = {'id': request.params.id};
        var update = request.body;
        const{firstName,description,duration,date} = update;
        console.log(update,query)
        var options = {new: true};
       const exercise =  await Exercise.findOne(query, update, options,
             function(err, exercise) {
            if (err) {
                console.log('got an error',err);
            }
           response.json(exercise)
           exercise.save();
           response.send('exercise updated') ;
        })

    } catch(err) {console.log(err)}
}) */

router.delete('/exercises/:id', async (request, response) =>{
       try {
        const exercise = await Exercise.findByIdAndDelete(request.params.id)
        response.json('Exercise deleted.')
    } catch (error) {
        console.log(error)
        response.sendStatus(500)
    }
});
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
        console.log(error)
        response.sendStatus(500)
    }
});

// Update todos

router.put('/todos/:id', async(req, res) => {
 try{
      const requestedId = req.params.id;
      const todo = await Todo.findOne({where: {id: requestedId}});
      todo.description = req.body.description;
      todo.date = req.body.date;
    
      await todo.save();
      res.send('todo updated') ;
    }
      catch (err) { console.error(err.message) }  
})
// Delete todos

router.delete('/todos/:id', async (req, res) =>{
       try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        res.json('Todos deleted.')
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

//SEND MAIL

router.post('/mail', async (request, response) =>{
    console.log(request.body)
    try {
        const {email} = req.body;
              sendmail(email)
        const createMail = await Mail.create(request.body)
        response.json(createMail)
    } catch (error) {
        console.log(error)
        response.sendStatus(500)
    }
})


module.exports = router;