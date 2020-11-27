import axios from 'axios';

const PRODUCT_BASE_API = "http://localhost:5000/api/v1/products"

class ProductService{

    getProducts(){
        return axios.get(PRODUCT_BASE_API);
    }

    createProduct(product){
        return axios.post(PRODUCT_BASE_API, product);
    }

}

export default new ProductService();