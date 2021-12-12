import request from "request-promise";
import cheerio, {Node} from "cheerio";

interface Brands {
    id: number
    name: string
}
const brands: Brands[]=
    [
        { id: 1, name: 'audi' },
        { id: 2, name: 'arisan' },
        { id: 3, name: 'ario' },
        { id: 4, name: 'alfa-romeo' },
        { id: 5, name: 'amico' },
        { id: 6, name: 'mg' },
        { id: 7, name: 'mvm' },
        { id: 8, name: 'opel' },
        { id: 9, name: 'baic' },
        { id: 10, name: 'brilliance' },
        { id: 11, name: 'besturn' },
        { id: 12, name: 'mercedes-benz' },
        { id: 13, name: 'bmw' },
        { id: 14, name: 'byd' },
        { id: 15, name: 'toyota' },
        { id: 16, name: 'tiba' },
        { id: 17, name: 'jac' },
        { id: 18, name: 'geely' },
        { id: 19, name: 'jeep' },
        { id: 20, name: 'dongfeng' },
        { id: 21, name: 'dena' },
        { id: 22, name: 'daewoo' },
        { id: 23, name: 'runna' },
        { id: 24, name: 'rayen' },
        { id: 25, name: 'renault' },
        { id: 26, name: 'rich' },
        { id: 27, name: 'rigan' },
        { id: 28, name: 'zamyad' },
        { id: 29, name: 'ssangyong' },
        { id: 30, name: 'saina' },
        { id: 31, name: 'samand' },
        { id: 32, name: 'suzuki' },
        { id: 33, name: 'citroen' },
        { id: 34, name: 'shahin' },
        { id: 35, name: 'foton' },
        { id: 36, name: 'volkswagen' },
        { id: 37, name: 'land-rover' },
        { id: 38, name: 'landmark' },
        { id: 39, name: 'lexus' },
        { id: 40, name: 'lifan' },
        { id: 41, name: 'mazda' },
        { id: 42, name: 'mitsubishi' },
        { id: 43, name: 'nissan' },
        { id: 44, name: 'hafei-lobo' },
        { id: 45, name: 'haval' },
        { id: 46, name: 'haima' },
        { id: 47, name: 'honda' },
        { id: 48, name: 'hyundai' },
        { id: 49, name: 'volvo' },
        { id: 50, name: 'irankhodro-van' },
        { id: 51, name: 'saipa' },
        { id: 52, name: 'narvan' },
        { id: 53, name: 'pazhan' },
        { id: 54, name: 'pride' },
        { id: 55, name: 'proton' },
        { id: 56, name: 'porsche' },
        { id: 57, name: 'peugeot' },
        { id: 58, name: 'paykan' },
        { id: 59, name: 'changan' },
        { id: 60, name: 'chery' },
        { id: 61, name: 'capra' },
        { id: 62, name: 'quick' },
        { id: 63, name: 'kia' }
    ]



export {brands,Brands}