"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRouter = void 0;
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const brands_1 = require("../models/brands");
exports.brandRouter = express_1.default.Router();
//get all category
exports.brandRouter.get("/", (req, res) => {
    if (brands_1.brands.length === 0) {
        return res.status(404).send('car not found');
    }
    res.send(brands_1.brands);
});
//get specific brand with index
exports.brandRouter.get("/:id", (req, res) => {
    const brand = brands_1.brands.find(x => x.id === parseInt(req.params.id));
    if (!brand) {
        res.status(404).send('book not found');
    }
    res.send(brand);
});
//post a brand
exports.brandRouter.post('/', (req, res) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const brand = {
        id: brands_1.brands.length + 1,
        name: req.body.name
    };
    const oldBrand = brands_1.brands.find(item => item.name === brand.name);
    if (oldBrand) {
        return res.status(404).send('we had this category. id is : ' + oldBrand.id);
    }
    brands_1.brands.push(brand);
    res.send(brand);
});
//delete a category
exports.brandRouter.delete('/:id', (req, res) => {
    const brand = brands_1.brands.find(x => x.id === parseInt(req.params.id));
    if (!brand) {
        return res.status(404).send('brand not found');
    }
    const index = brands_1.brands.indexOf(brand);
    brands_1.brands.splice(index);
    res.send(brand);
});
