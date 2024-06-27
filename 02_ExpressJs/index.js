import 'dotenv/config';
import express from 'express';
import logger from './logger.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
  
        };
        logger.info(JSON.stringify(logObject));
      }
    }
  }));

// Some basic route examples
app.get('/', (req, res) => {
    res.send("Go to register route!");
})

app.get("/login", (req, res) => {
    res.send("Send some data at credentials route");
})

app.get("/register", (req, res) => {
    res.send("To login go to login route");
})


// To access data from URL
app.use(express.json());

// To store data into array
let Data = [];
let nextId = 1;

// To send data to route
app.post("/credentials", (req, res) => {
    logger.info("A Post request has made!")
    const {name, age} = req.body;
    const newData = {id:nextId++, name, age};
    Data.push(newData);
    res.status(201).send(newData);
});

// To retrieve object from route
app.get("/credentials", (req, res) => {
    res.status(200).send(Data);
})

// To retrieve specific object from route
app.get("/credentials/:id", (req, res) => {
    const object = Data.find(obj => obj.id === parseInt(req.params.id));
    (!object) ? res.status(404).send("Could not find record!") : res.status(200).send(object);
})

// To update specific object
app.put("/credentials/:id", (req, res) => {
    const object = Data.find(obj => obj.id === parseInt(req.params.id));
    
    if (!object) {
        logger.error("Record can not be updated as it does not exist!");
        return res.status(404).send("Could not find record!");
    }

    const { name, age } = req.body;
    object.name = name;
    object.age = age;
    res.status(200).send(object);
})

// To delete specific object
app.delete("/credentials/:id", (req, res) => {
    const index = Data.findIndex(obj => obj.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).send("Could not find record!");
    }
    logger.warn("Deleting a record!");
    Data.splice(index, 1);
    res.status(200).send("Record has deleted!");
})

// To listen server on specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});