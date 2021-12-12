"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var got_1 = require("got");
var express_1 = require("express");
var joi_1 = require("joi");
var cheerio_1 = require("cheerio");
var request_promise_1 = require("request-promise");
var helmet_1 = require("helmet");
var debug_1 = require("debug");
var app = (0, express_1["default"])();
var port = process.env.PORT || 3000;
var str = "";
var globTime = 300000;
var errorDebug = (0, debug_1["default"])("app:error");
var cars = [];
var brands = [];
app.use(express_1["default"].json());
app.use(helmet_1["default"].hidePoweredBy());
(function () {
    (0, request_promise_1["default"])('https://divar.ir/s/mashhad/car', function (error, response, html) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio_1["default"].load(html);
            var data_1 = $(".kt-internal-link-list__item-content");
            var datas = Array.from($(data_1));
            var hrefs_1 = [];
            datas.forEach(function (item, i) {
                // @ts-ignore
                hrefs_1.push(data_1["".concat(i)].attribs.href);
            });
            hrefs_1.forEach(function (item, i) {
                brands.push({
                    id: i + 1,
                    name: item.substr(15)
                });
            });
        }
    });
})();
function getCars(carBrand) {
    if (carBrand === void 0) { carBrand = brands[Math.floor(Math.random() * (brands.length))].name; }
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, got_1["default"])("https://api.divar.ir/v8/web-search/mashhad/car/".concat(carBrand))];
                case 1:
                    response = _a.sent();
                    json = JSON.parse(response.body);
                    // @ts-ignore
                    json.widget_list.forEach(function (_item) {
                        //str+=`<div> <h1>title: ${_item.data.title}</h1> <img src='${_item.data.image}'><h4>description: ${_item.data.description}</h4> </div>`
                        cars.push({
                            title: _item.data.title,
                            image: _item.data.image,
                            description: _item.data.description,
                            normalText: _item.data.normal_text,
                            index: _item.data.index,
                            city: _item.data.city,
                            district: _item.data.district,
                            category: _item.data.category
                        });
                    });
                    return [2 /*return*/, cars];
                case 2:
                    error_1 = _a.sent();
                    errorDebug(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//getAll
app.get("/api/car", function (req, res) {
    if (cars.length === 0) {
        return res.status(404).send('car not found');
    }
    res.send(cars);
});
//get all category
app.get("/api/brand", function (req, res) {
    if (brands.length === 0) {
        return res.status(404).send('car not found');
    }
    res.send(brands);
});
//get specific car with index
app.get("/api/car/:id", function (req, res) {
    var car = cars.find(function (x) { return x.index === parseInt(req.params.id); });
    if (!car) {
        res.status(404).send('book not found');
    }
    res.send(car);
});
//get specific brand with index
app.get("/api/brand/:id", function (req, res) {
    var brand = brands.find(function (x) { return x.id === parseInt(req.params.id); });
    if (!brand) {
        res.status(404).send('book not found');
    }
    res.send(brand);
});
//update interval time
app.put("/api/car/", function (req, res) {
    var schema = joi_1["default"].object({
        time: joi_1["default"].number().min(5).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    globTime = req.body.time;
    res.send({
        "time": "".concat(globTime)
    });
});
//post a brand
app.post('/api/brand', function (req, res) {
    var schema = joi_1["default"].object({
        name: joi_1["default"].string().min(5).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    var brand = {
        id: brands.length + 1,
        name: req.body.name
    };
    var oldBrand = brands.find(function (item) { return item.name === brand.name; });
    if (oldBrand) {
        return res.status(404).send('we had this category. id is : ' + oldBrand.id);
    }
    brands.push(brand);
    res.send(brand);
});
//delete a car
app["delete"]('/api/car/:id', function (req, res) {
    var car = cars.find(function (x) { return x.index === parseInt(req.params.id); });
    if (!car) {
        return res.status(404).send('car not found');
    }
    var index = cars.indexOf(car);
    cars.splice(index);
    res.send(car);
});
//delete a category
app["delete"]('/api/brand/:id', function (req, res) {
    var brand = brands.find(function (x) { return x.id === parseInt(req.params.id); });
    if (!brand) {
        return res.status(404).send('brand not found');
    }
    var index = brands.indexOf(brand);
    brands.splice(index);
    res.send(brand);
});
var getEverySpecificTime = function (time, carBrand) {
    if (time === void 0) { time = globTime; }
    if (carBrand === void 0) { carBrand = brands[Math.floor(Math.random() * (brands.length))].name; }
    setInterval(function () {
        getCars(carBrand).then();
    }, time);
    return cars;
};
var consoleEverySpecificTime = function (time, carBrand) {
    if (time === void 0) { time = globTime; }
    if (carBrand === void 0) { carBrand = brands[Math.floor(Math.random() * (brands.length))].name; }
    setInterval(function () {
        getCars(carBrand).then(function () {
            console.log(cars);
        });
    }, time);
};
var portListener = (0, debug_1["default"])("app:listen");
app.listen(port, function () {
    portListener("listening to port : " + port);
});
var getBrands = function () {
    return brands;
};
var getNames = function () {
    var names = [];
    brands.forEach(function (item) {
        names.push(item.name);
    });
    return names;
};
exports.getCars = getCars;
exports.gesTime = getEverySpecificTime;
exports.consTime = consoleEverySpecificTime;
exports.getBrands = getBrands;
exports.getNames = getNames;
