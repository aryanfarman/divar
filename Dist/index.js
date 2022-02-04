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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNames = exports.getBrands = exports.consoleEverySpecificTime = exports.getEverySpecificTime = exports.getCars = void 0;
const got_1 = __importDefault(require("got"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const debug_1 = __importDefault(require("debug"));
const brands_1 = require("./models/brands");
const carRoutes_1 = require("./routes/carRoutes");
const brandRoutes_1 = require("./routes/brandRoutes");
const cars_1 = require("./models/cars");
const persian_tools_1 = require("@persian-tools/persian-tools");
const port = process.env.PORT || 3000;
let str = "";
/*
import cheerio, {CheerioAPI, Node} from 'cheerio';
import request from 'request-promise';

 const getCat=async (url:string) => {
        await request('https://divar.ir/s/mashhad/car', (error: any, response: { statusCode: number; }, html: string | Node | Node[] | Buffer )=>{
            if(!error && response.statusCode===200){
                const $ = cheerio.load(html);
                const data = $(".kt-internal-link-list__item-content");
                const datas = Array.from($(data));
                const hrefs :Array<string>=[] ;
                datas.forEach((item,i)=>{
                    // @ts-ignore
                    hrefs.push(data[`${i}`].attribs.href)
                })
                hrefs.forEach((item,i)=> {
                    brands.push({
                        id: i+1,
                        name: item.substr(15)
                    })
                   return brands
                })
            }
    })
}*/
const errorDebug = (0, debug_1.default)("app:error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(helmet_1.default.hidePoweredBy());
function getCars(carBrand = brands_1.brands[Math.floor(Math.random() * (brands_1.brands.length))].name) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('hi');
        try {
            const response = yield (0, got_1.default)(`http://api.divar.ir/v8/web-search/mashhad/car/${carBrand}`);
            const json = JSON.parse(response.body);
            // @ts-ignore
            json.widget_list.forEach(_item => {
                if (_item.data.description.includes('تومان')) {
                    _item.data.description = _item.data.description.split('\n');
                    _item.data.description[1] = _item.data.description[1].replace('تومان', '');
                    _item.data.description[1] = _item.data.description[1].replace(/,/g, '');
                    _item.data.description[1] = (0, persian_tools_1.digitsFaToAr)(_item.data.description[1]);
                    _item.data.description[1] = (0, persian_tools_1.digitsArToEn)(_item.data.description[1]);
                    _item.data.description[0] = _item.data.description[0].replace('کیلومتر', '');
                    _item.data.description[0] = _item.data.description[0].replace(/,/g, '');
                    _item.data.description[0] = (0, persian_tools_1.digitsFaToAr)(_item.data.description[0]);
                    _item.data.description[0] = (0, persian_tools_1.digitsArToEn)(_item.data.description[0]);
                    _item.data.description[0] = _item.data.description[0].replace(' ', 'KM');
                    cars_1.cars.push({
                        title: _item.data.title,
                        image: _item.data.image,
                        price: +_item.data.description[1],
                        kilometer: _item.data.description[0],
                        normalText: _item.data.normal_text,
                        index: _item.data.index,
                        city: _item.data.city,
                        district: _item.data.district,
                        category: _item.data.category
                    });
                }
            });
            return cars_1.cars;
        }
        catch (error) {
            errorDebug(error);
        }
    });
}
exports.getCars = getCars;
// car Routes
app.use("/api/car", carRoutes_1.carRouter);
// brand Routes
app.use("/api/brand", brandRoutes_1.brandRouter);
const getEverySpecificTime = function (time = carRoutes_1.globTime, carBrand = brands_1.brands[Math.floor(Math.random() * (brands_1.brands.length))].name) {
    setInterval(() => {
        getCars(carBrand).then();
    }, time);
    return cars_1.cars;
};
exports.getEverySpecificTime = getEverySpecificTime;
const consoleEverySpecificTime = function (time = carRoutes_1.globTime, carBrand = brands_1.brands[Math.floor(Math.random() * (brands_1.brands.length))].name) {
    const logger = (0, debug_1.default)("app:logger");
    setInterval(() => {
        getCars(carBrand).then(() => {
            logger(cars_1.cars);
        });
    }, time);
};
exports.consoleEverySpecificTime = consoleEverySpecificTime;
const portListener = (0, debug_1.default)("app:listen");
app.listen(port, () => {
    portListener("listening to port : " + port);
});
const getBrands = function () {
    return brands_1.brands;
};
exports.getBrands = getBrands;
const getNames = function () {
    const names = [];
    brands_1.brands.forEach(item => {
        names.push(item.name);
    });
    return names;
};
exports.getNames = getNames;
