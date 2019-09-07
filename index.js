 
const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req, res)=>{
});

/*

app.get('/api/courses', (req, res) =>{
   res.send([1, 2, 3]); 
});
*/

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

 
app.get('/api/courses', (req, res) =>{
    res.send(courses);
}); 



//Single course
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found') //404
    res.send(course)
    });
    
   
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse (req.body); /*  
    same thing as result.error
    There are only two possible outcomes from this validateCourse (req.body) which are value or error
    since we interested in the error, we therefore use object distrupturing feature with {}
    
    */
                         //404  Bad Request
    if(error) return res.status(400).send(error.details[0].message);
        
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
        courses.push(course);
     res.send(course);
    });


//Validation logic we can call elsewhere to validate a single course input
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
         //instead of req.body argument, we replace it by course
    return   Joi.validate(course, schema);
}

app.put('/api/courses/:id', (req, res) => {
    //Process is: validate, if invalid{return 400 - Bad request}
   
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found')
    
    
    const { error } = validateCourse (req.body); /*  
    same thing as result.error
    There are only two possible outcomes from this validateCourse (req.body) which are value or error
    since we interested in the error, we therefore use object distrupturing feature with {}
    
    */

    
        //404  Bad Request
    if(error) return res.status(400).send(error.details[0].message);
        
    

    //Update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found')
    
    //finding the index on the array and using splice to delete it
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});




//PORT 
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on PORT ${port}...`));