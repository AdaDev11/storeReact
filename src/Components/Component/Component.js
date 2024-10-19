import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import storeLimit from './ComponentStoreMobx';
import './Component.css';

const Component = observer(() => {

    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleBuy = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const handleDecrease = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (!existingProduct) return;

        if (existingProduct.quantity === 1) {
            setCart(cart.filter(item => item.id !== product.id));
        } else {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        }
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleCloseModal = () => setShowModal(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);


    const [page, setPage] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 5;
    const [filter, setFilter] = useState(storeLimit.filterSearch);
    const [minPriceValue, setMinPriceValue] = useState(storeLimit.minPrice);
    const [maxPriceValue, setMaxPriceValue] = useState(storeLimit.maxPrice);


    useEffect(() => {
        storeLimit.limitFetch(page * productsPerPage, productsPerPage);
        setTotalProducts(55);
    }, [page]);

    const handleInputChange = (event) => {
        setFilter(storeLimit.setFilterSearchMobx(event.target.value));
    };

    const handleFilterMinPrice = (event) => {
        storeLimit.minPrice = event.target.value;
        setMinPriceValue(storeLimit.minPriceMobx(event.target.value));
        storeLimit.filterPrice();
    };

    const handleFilterMaxPrice = (event) => {
        storeLimit.maxPrice = event.target.value;
        setMaxPriceValue(storeLimit.maxPriceMobx(event.target.value));
        storeLimit.filterPrice();
    };

    const handleCategoryFilter = (categoryId) => {
        storeLimit.fetchProductsByCategory(categoryId);
    };

    const productsToDisplay = storeLimit.filterSearch ? storeLimit.searchProducts : storeLimit.limitFetch;
    const productsToPriceDisplay = (storeLimit.minPrice && storeLimit.maxPrice) ? storeLimit.priceProducts : storeLimit.limitFetch;

    const productsToCategory = storeLimit.categoriesProducts.length > 0 ? storeLimit.categoriesProducts : storeLimit.allProducts;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setPage(pageNumber - 1);

    return (
        <div>
            {/* Cart Modal */}

            <div className={`modal ${showModal ? 'show' : ''}`}>
                {showModal && (
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Your Cart</h2>
                        <button onClick={handleCloseModal}>Close</button>
                        {showModal && (
                            <div>
                                <div>
                                    {cart.length > 0 ? (
                                        <div>
                                            {cart.map((item) => (
                                                <div key={item.id} className="product-item">
                                                    <img src={item.images} alt={item.title} style={{ width: '80px', height: '80px', borderRadius: '5px' }} />
                                                    <div style={{ flex: '1', marginLeft: '10px' }}>
                                                        <h3 style={{ margin: '0' }}>{item.title}</h3>
                                                        <p style={{ margin: '0' }}>Price: <strong>${item.price}</strong></p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <button onClick={() => handleDecrease(item)}>-</button>
                                                        <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                                        <button onClick={() => handleBuy(item)}>+</button>
                                                    </div>
                                                </div>
                                            ))}


                                            <hr />
                                            <p>Total Price: ${totalPrice.toFixed(2)}</p>
                                        </div>
                                    ) : (
                                        <p>Your cart is empty</p>
                                    )}
                                </div>
                                <div>
                                    <button onClick={handleClearCart}>Clear Cart</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>


            <div>
                <button onClick={() => setShowModal(true)}>
                    View Cart ({totalItems} items)
                </button>
            </div>

            <ul>
                <button onClick={() => handleCategoryFilter(1)}>Clothes</button>
                <button onClick={() => handleCategoryFilter(2)}>Electronics</button>
                <button onClick={() => handleCategoryFilter(3)}>Change</button>
                <button onClick={() => handleCategoryFilter(4)}>Shoes</button>
                <button onClick={() => handleCategoryFilter(10000000000000)}>Clear</button>
            </ul>

            <input
                type='text'
                placeholder='Search...'
                value={filter}
                onChange={handleInputChange}
            />

            <input
                type='number'
                placeholder='Min Price...'
                value={minPriceValue}
                onChange={handleFilterMinPrice}
            />

            <input
                type='number'
                placeholder='Max Price...'
                value={maxPriceValue}
                onChange={handleFilterMaxPrice}
            />


            <div>
                {productsToCategory && productsToCategory.length > 0 ? (
                    productsToCategory.map(product => (
                        <div key={product.id} className="product">
                            <img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p>{product.category.name}</p>
                            <p>{product.price}$</p>
                            <button onClick={() => handleBuy(product)} className="page-link">Buy</button>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>

            <div>
                {productsToDisplay && productsToDisplay.length > 0 ? (
                    productsToDisplay.map(product => (
                        <div key={product.id} className="product">
                            <img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p>{product.category.name}</p>
                            <p>{product.price}$</p>
                            <button onClick={() => handleBuy(product)} className="page-link">Buy</button>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>

            <div>
                {productsToPriceDisplay && productsToPriceDisplay.length > 0 ? (
                    productsToPriceDisplay.map(product => (
                        <div key={product.id} className="product">
                            <img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p>{product.category.name}</p>
                            <p>{product.price}$</p>
                            <button onClick={() => handleBuy(product)} className="page-link">Buy</button>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>

            <div className='modal fade'>
                {productsToPriceDisplay && productsToDisplay && productsToPriceDisplay.length && productsToDisplay.length > 0 ? (
                    productsToPriceDisplay.map(product => (
                        <div key={product.id} className="product">
                            <img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p>{product.category.name}</p>
                            <p>{product.price}$</p>
                            <button onClick={() => handleBuy(product)} className="page-link">Buy</button>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
            <div ref={useRef()}>
                {storeLimit.products.length && storeLimit.products.length > 0 ? (
                    storeLimit.products.map(product => (
                        <div key={product.id} className="product">
                            <img src={Array.isArray(product.images) ? product.images[0] : product.images} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p>{product.category.name}</p>
                            <p>{product.price}$</p>
                            <button onClick={() => handleBuy(product)} className="page-link">Buy</button>
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}

                <div className="pagination">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
                        Previous
                    </button>
                    <span>Page {page + 1}</span>
                    <button onClick={() => setPage(prev => prev + 1)} disabled={(page + 1) >= Math.ceil(totalProducts / productsPerPage)}>
                        Next
                    </button>
                </div>

                <nav>
                    <ul className="pagination">
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div >
    );
})

export default Component;