import axios from 'axios';

const PRODUCT_CATEGORY_BASE_API = "http://localhost:5000/api/v1/productCategories"

class ProductCategoryService{

    getProductCategories(){
        return axios.get(PRODUCT_CATEGORY_BASE_API);
    }

    createProductCategory(productCategory){
        return axios.post(PRODUCT_CATEGORY_BASE_API, productCategory);
    }

}

export default new ProductCategoryService();