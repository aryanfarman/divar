import got from 'got' ;
import express from 'express' ;
import helmet from 'helmet';
import debug from 'debug';
import {brands} from './models/brands'
import {carRouter, globTime} from "./routes/carRoutes";
import {brandRouter} from "./routes/brandRoutes";
import {cars} from "./models/cars";
import {digitsArToEn, digitsFaToAr} from "@persian-tools/persian-tools";
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


const errorDebug = debug("app:error");
const app = express();
app.use(express.json());
app.use(helmet.hidePoweredBy());
async function getCars(carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {
    console.log('hi')

    try {

        const response = await got(`http://api.divar.ir/v8/web-search/mashhad/car/${carBrand}`);

        const json = JSON.parse(response.body);
        // @ts-ignore
        json.widget_list.forEach(_item => {
            if(_item.data.description.includes('تومان')) {
                _item.data.description = _item.data.description.split('\n')
                _item.data.description[1]=_item.data.description[1].replace('تومان','')
                _item.data.description[1]=_item.data.description[1].replace(/,/g,'')
                _item.data.description[1]=digitsFaToAr(_item.data.description[1])
                _item.data.description[1]=digitsArToEn(_item.data.description[1])
                _item.data.description[0]=_item.data.description[0].replace('کیلومتر','')
                _item.data.description[0]=_item.data.description[0].replace(/,/g,'')
                _item.data.description[0]=digitsFaToAr(_item.data.description[0])
                _item.data.description[0]=digitsArToEn(_item.data.description[0])
                _item.data.description[0]=_item.data.description[0].replace(' ','KM')
                cars.push({
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
        })
        return cars;
    } catch (error) {
        errorDebug(error);
    }
}

const getEverySpecificTime = function (time = globTime, carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {

    setInterval(() => {
        getCars(carBrand).then();
    }, time)

    return cars;
}
const consoleEverySpecificTime = function (time = globTime, carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {
    const logger = debug("app:logger")
    setInterval(() => {
        getCars(carBrand).then(() => {
            logger(cars);
        });
    }, time)
}
const getBrands = function () {
    return brands;
}
const getNames = function () {
    const names: string[] = [];
    brands.forEach(item => {
        names.push(item.name)
    })
    return names;
};
export {getCars, getEverySpecificTime, consoleEverySpecificTime, getBrands, getNames}
