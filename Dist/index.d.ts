declare function getCars(carBrand?: string): Promise<import("./models/cars").Cars[] | undefined>;
declare const getEverySpecificTime: (time?: number, carBrand?: string) => import("./models/cars").Cars[];
declare const consoleEverySpecificTime: (time?: number, carBrand?: string) => void;
declare const getBrands: () => import("./models/brands").Brands[];
declare const getNames: () => string[];
export { getCars, getEverySpecificTime, consoleEverySpecificTime, getBrands, getNames };
