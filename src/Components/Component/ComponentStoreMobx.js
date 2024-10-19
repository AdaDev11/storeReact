import { action, makeAutoObservable, observable } from "mobx";

class StoreLimit {
    products = [];
    limit5 = [];
    limit10 = [];
    limit15 = [];
    limit20 = [];
    filterSearch = '';
    searchProducts = [];
    minPrice = '';
    maxPrice = '';
    priceProducts = [];
    categoriesProducts = [];
    categoryId = '';

    constructor() {
        makeAutoObservable(this, {
            products: observable,
            limitFetch: action,
            limit5: observable,
            limit10: observable,
            limit15: observable,
            limit20: observable,
            limit5Fetch: action,
            limit10Fetch: action,
            limit15Fetch: action,
            limit20Fetch: action,
            filterSearch: observable,
            filterSearchFetch: action,
            setFilterSearchMobx: action,
            searchProducts: observable,
            minPrice: observable,
            maxPrice: observable,
            priceProducts: observable,
            minPriceMobx: action,
            maxPriceMobx: action,
            categoriesProducts: observable,
            fetchProductsByCategory: action,
            categoryId: observable,
        });
    }

    limitFetch = (offset, limit) => {
        fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            .then(res => res.json())
            .then(json => {
                this.products = json;
                // console.log(offset + " " + limit);
                // console.log(json);
            })
            .catch(error => console.error("Failed to fetch products:", error));
    };

    limit5Fetch() {
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=5')
            .then(res => res.json())
            .then(json => this.limit5 = json)
            .catch((error) => console.error("Limit 5 not available" + error))
    };

    limit10Fetch() {
        fetch('https://api.escuelajs.co/api/v1/products?offset=5&limit=5')
            .then(res => res.json())
            .then(json => this.limit10 = json)
            .catch((error) => console.error("Limit 10 not available" + error))
    };

    limit15Fetch() {
        fetch('https://api.escuelajs.co/api/v1/products?offset=10&limit=5')
            .then(res => res.json())
            .then(json => this.limit15 = json)
            .catch((error) => console.error("Limit 15 not available" + error))
    };

    limit20Fetch() {
        fetch('https://api.escuelajs.co/api/v1/products?offset=15&limit=5')
            .then(res => res.json())
            .then(json => this.limit20 = json)
            .catch((error) => console.error("Limit 20 not available" + error))
    }

    filterSearchFetch() {
        fetch(`https://api.escuelajs.co/api/v1/products/?title=${this.filterSearch}`)
            .then(res => res.json())
            .then(json => {
                this.searchProducts = json
            })
            .catch((error) => console.error("Search filter error: " + error))
    };

    setFilterSearchMobx(value) {
        this.filterSearch = value;
        this.filterSearchFetch();
    };

    filterPrice() {
        fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${this.minPrice}&price_max=${this.maxPrice}`)
            .then(res => res.json())
            .then(json => {
                this.priceProducts = json;
            })
            .catch((error) => console.error("Search filter error: " + error));
    };

    minPriceMobx(value) {
        this.minPrice = value;
        this.filterPrice();
    };

    maxPriceMobx(value) {
        this.maxPrice = value;
        this.filterPrice();
    };

    fetchProductsByCategory(categoryId) {
        fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
            .then(res => res.json())
            .then(json => {
                this.categoriesProducts = json;
            })
            .catch((error) => console.error("Category filter error: " + error));
    }

}

const storeLimit = new StoreLimit();
export default storeLimit;