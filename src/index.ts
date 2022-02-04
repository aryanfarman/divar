import got from 'got' ;
import debug from 'debug';
import {brands} from './models/brands'
import {cars} from "./models/cars";
import {digitsArToEn, digitsFaToAr} from "@persian-tools/persian-tools";

const globTime= 3000;

const errorDebug = debug("app:error");

async function getCars(carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {

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
