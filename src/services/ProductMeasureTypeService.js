import axios from 'axios';

const PRODUCT_MEASURE_TYPE_BASE_API = "http://localhost:5000/api/v1/measureTypes"

class ProductMeasureTypeService{

    getProductMeasureTypes(){
        return axios.get(PRODUCT_MEASURE_TYPE_BASE_API);
    }

}

export default new ProductMeasureTypeService();