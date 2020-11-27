import axios from 'axios';

const STOCK_BASE_API = process.env.REACT_APP_BASE_API_URL + "/stocks";

class StockService{

    getStocks(){
        return axios.get(STOCK_BASE_API);
    }

    addToStock(stock){
        return axios.post(STOCK_BASE_API, stock);
    }

    getStockByProduct(productId){
        return axios.get(STOCK_BASE_API + "/products/" + productId);
    }

    issueStock(stockIssue){
        return axios.post(STOCK_BASE_API + "/issue", stockIssue);
    }

    getStockById(stockId){
        return axios.get(STOCK_BASE_API + "/" + stockId);
    }
    
    updateStock(stockId, updateStock){
        return axios.put(STOCK_BASE_API + "/" + stockId, updateStock);
    }

    getStocksLogsByCategory(productCategoryId){
        return axios.get(STOCK_BASE_API + "/getDailyStocks/" + productCategoryId);
    }

    getCurrentStockByCategory(productCategoryId){
        return axios.get(STOCK_BASE_API + "/getCurrentStock/" + productCategoryId);
    }
}

export default new StockService();