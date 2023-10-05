import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

//This is not secure way to connect to database, but for now it will work
mongoose.connect("mongodb+srv://eeteam:EstateElite123456@estate-elite.ar82uwe.mongodb.net/estate-elite?retryWrites=true&w=majority");

app.listen(3001, () => console.log('Server Started'));