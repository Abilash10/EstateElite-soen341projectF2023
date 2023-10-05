import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

//Don't put password directly in here, we will secure using github secrets
mongoose.connect("mongodb+srv://eeteam:<password>@estate-elite.ar82uwe.mongodb.net/?estate-eliteretryWrites=true&w=majority");

app.listen(3001, () => console.log('Server Started'));