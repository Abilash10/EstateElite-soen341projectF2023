import express from 'express'; //allows to create the API
import cors from 'cors';    //establishes connection between back-end/front-end
import mongoose from 'mongoose'; //allows communication with databases
import {userRouter} from './routes/users.js'
import {propertiesRouter} from './routes/properties.js';
import {offersRouter} from './routes/offers.js';
import { brokerRouter } from './routes/broker.js';

const app = express();

app.use(express.json()); //convert data from front-end in json format
app.use(cors());    //solve API issues

app.use("/auth",userRouter);
app.use("/properties",propertiesRouter);
app.use("/offers",offersRouter);
app.use("/broker",brokerRouter);

//TODO: Transition to github secrets to hide the password
mongoose.connect(   //connecting our database to the code
    "mongodb+srv://eeteam:EstateElite123456@estate-elite.ar82uwe.mongodb.net/estate-elite?retryWrites=true&w=majority",
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }
);


app.listen(3001, () => console.log('Server Started!')); //tells our API to start 
