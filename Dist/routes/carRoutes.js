"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = exports.globTime = void 0;
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const cars_1 = require("../models/cars");
exports.globTime = 300000;
//get specific car with index
exports.carRouter = express_1.default.Router();
exports.carRouter.get("/:id", (req, res) => {
    const car = cars_1.cars.find(x => x.index === parseInt(req.params.id));
    if (!car) {
        res.status(404).send('book not found');
    }
    res.send(car);
});
//getAll
exports.carRouter.get("/", (req, res) => {
    if (cars_1.cars.length === 0) {
        return res.status(404).send('car not found');
    }
    res.send(cars_1.cars);
});
//update interval time
exports.carRouter.put("/", (req, res) => {
    const schema = joi_1.default.object({
        time: joi_1.default.number().min(5).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    exports.globTime = req.body.time;
    res.send({
        "time": `${exports.globTime}`
    });
});
//delete a car
exports.carRouter.delete('/:id', (req, res) => {
    const car = cars_1.cars.find(x => x.index === parseInt(req.params.id));
    if (!car) {
        return res.status(404).send('car not found');
    }
    const index = cars_1.cars.indexOf(car);
    cars_1.cars.splice(index);
    res.send(car);
});
