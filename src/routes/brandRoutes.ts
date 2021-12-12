import Joi from "joi";
import express,{Request,Response, NextFunction} from 'express' ;
import {brands,Brands} from '../models/brands'
export const brandRouter =express.Router();



//get all category

brandRouter.get("/", (req, res) => {
    if(brands.length===0){
        return res.status(404).send('car not found');
    }
    res.send(brands);
})

//get specific brand with index
brandRouter.get("/:id",(req,res)=>{
    const brand = brands.find(x => x.id === parseInt(req.params.id))
    if(!brand){
        res.status(404).send('book not found');
    }
    res.send(brand);
})
//post a brand
brandRouter.post('/', (req, res) => {

    const schema = Joi.object({
        name : Joi.string().min(5).required()
    })
    const result = schema.validate(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const brand:Brands = {
        id: brands.length + 1,
        name: req.body.name
    }

    const oldBrand=brands.find(item=> item.name===brand.name);
    if(oldBrand){
        return  res.status(404).send('we had this category. id is : '+ oldBrand.id);
    }

    brands.push(brand);
    res.send(brand);
})
//delete a category
brandRouter.delete('/:id', (req, res) => {
    const brand = brands.find(x => x.id === parseInt(req.params.id))
    if(!brand) {
        return res.status(404).send('brand not found');
    }
    const index = brands.indexOf(brand);
    brands.splice(index)
    res.send(brand);

})
