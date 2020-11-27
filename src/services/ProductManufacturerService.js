import axios from 'axios';

const PRODUCT_MANUFACTURER_BASE_API = "http://localhost:5000/api/v1/manufacturers"

class ProductManufacturerService{

    getProductManufacturers(){
        return axios.get(PRODUCT_MANUFACTURER_BASE_API);
    }

}

export default new ProductManufacturerService();