import Joi from "joi";
import express,{Request,Response, NextFunction} from 'express' ;
import {cars} from "../models/cars";
export let globTime = 300000;
//get specific car with index

export const carRouter = express.Router();


carRouter.get("/:id",(req, res)=>{
    const car = cars.find(x => x.index === parseInt(req.params.id))
    if(!car){
        res.status(404).send('book not found');
    }
    res.send(car);
})
//getAll
carRouter.get("/", (req,res) => {
    if(cars.length===0){
        return res.status(404).send('car not found');

    }
    res.send(cars);

})
//update interval time
carRouter.put("/",(req,res)=>{

    const schema = Joi.object({
        time : Joi.number().min(5).required()
    })
    const result = schema.validate(req.body);

    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    globTime = req.body.time;
    res.send({
        "time": `${globTime}`
    });

})

//delete a car
carRouter.delete('/:id', (req, res) => {
    const car = cars.find(x => x.index === parseInt(req.params.id))
    if(!car){
        return res.status(404).send('car not found');
    }
    const index = cars.indexOf(car);
    cars.splice(index)

    res.send(car);
})

