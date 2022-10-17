import React from "react";

function Shop() {
    return (
        <div className="shop-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Shop</h1>
                                <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p>

                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="products-shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row align-items-center">
                                <div className="col-lg-12 mb-4 mb-lg-0">
                                    <div className="section-title">
                                        <h2 className="d-block text-left-sm">Shop</h2>

                                        <div className="heading d-flex justify-content-between mb-5">
                                            <p className="result-count mb-0"> Showing 1–6 of 17 results</p>
                                            <form className="ordering " method="get">
                                                <select name="orderby" className="orderby form-control" aria-label="Shop order" >
                                                    <option value="" selected>Default sorting</option>
                                                    <option value="">Sort by popularity</option>
                                                    <option value="">Sort by average rating</option>
                                                    <option value="">Sort by latest</option>
                                                    <option value="">Sort by price: low to high</option>
                                                    <option value="">Sort by price: high to low</option>
                                                </select>
                                                <input type="hidden" name="paged" value="1" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" >
                                    <div className="product">
                                        <div className="product-wrap">
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                                        </div>

                                        <span className="onsale">Sale</span>
                                        <div className="product-hover-overlay">
                                            <a href="#"><i className="tf-ion-android-cart"></i></a>
                                            <a href="#"><i className="tf-ion-ios-heart"></i></a>
                                        </div>

                                        <div className="product-info">
                                            <h2 className="product-title h5 mb-0"><a href="/product-single">Floral Kirby</a></h2>
                                            <span className="price">
                                                $329.10
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                                    <div className="product">
                                        <div className="product-wrap">
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/111.jpg" alt="product-img" /></a>
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/444.jpg" alt="product-img" /></a>
                                        </div>

                                        <div className="product-hover-overlay">
                                            <a href="#"><i className="tf-ion-android-cart"></i></a>
                                            <a href="#"><i className="tf-ion-ios-heart"></i></a>
                                        </div>

                                        <div className="product-info">
                                            <h2 className="product-title h5 mb-0"><a href="/product-single">Open knit switer</a></h2>
                                            <span className="price">
                                                $29.10
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" >
                                    <div className="product">
                                        <div className="product-wrap">
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/222.jpg" alt="product-img" /></a>
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/322.jpg" alt="product-img" /></a>
                                        </div>

                                        <span className="onsale">Sale</span>
                                        <div className="product-hover-overlay">
                                            <a href="#"><i className="tf-ion-android-cart"></i></a>
                                            <a href="#"><i className="tf-ion-ios-heart"></i></a>
                                        </div>

                                        <div className="product-info">
                                            <h2 className="product-title h5 mb-0"><a href="/product-single">Official trendy</a></h2>
                                            <span className="price">
                                                $350.00 – $355.00
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                                    <div className="product">
                                        <div className="product-wrap">
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/111.jpg" alt="product-img" /></a>
                                        </div>

                                        <div className="product-hover-overlay">
                                            <a href="#"><i className="tf-ion-android-cart"></i></a>
                                            <a href="#"><i className="tf-ion-ios-heart"></i></a>
                                        </div>

                                        <div className="product-info">
                                            <h2 className="product-title h5 mb-0"><a href="/product-single">Frock short</a></h2>
                                            <span className="price">
                                                $249
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                                    <div className="product">
                                        <div className="product-wrap">
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/444.jpg" alt="product-img" /></a>
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                        </div>

                                        <div className="product-hover-overlay">
                                            <a href="#"><i className="tf-ion-android-cart"></i></a>
                                            <a href="#"><i className="tf-ion-ios-heart"></i></a>
                                        </div>

                                        <div className="product-info">
                                            <h2 className="product-title h5 mb-0"><a href="/product-single">Sleeve dress</a></h2>
                                            <span className="price">
                                                $59.10
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" >
                                    <div className="product">
                                        <div className="product-wrap">
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-first" src="assets/images/322.jpg" alt="product-img" /></a>
                                            <a href="/product-single"><img className="img-fluid w-100 mb-3 img-second" src="assets/images/222.jpg" alt="product-img" /></a>
                                        </div>

                                        <div className="product-hover-overlay">
                                            <a href="#"><i className="tf-ion-android-cart"></i></a>
                                            <a href="#"><i className="tf-ion-ios-heart"></i></a>
                                        </div>

                                        <div className="product-info">
                                            <h2 className="product-title h5 mb-0"><a href="/product-single">Stylish dress</a></h2>
                                            <span className="price">
                                                $99.00
                                            </span>
                                        </div>
                                    </div>
                                </div>




                                <div className="col-12">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">




                            <form className="mb-5">



                                <section className="widget widget-colors mb-5">
                                    <h3 className="widget-title h4 mb-4">Shop by color</h3>
                                    <ul className="list-inline">
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color1" />
                                                <label className="custom-control-label sky-blue" htmlFor="color1"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color2" checked />
                                                <label className="custom-control-label red" htmlFor="color2"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color3" />
                                                <label className="custom-control-label dark" htmlFor="color3"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color4" />
                                                <label className="custom-control-label magenta" htmlFor="color4"></label>
                                            </div>
                                        </li>
                                        <li className="list-inline-item mr-4">
                                            <div className="custom-control custom-checkbox color-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="color5" />
                                                <label className="custom-control-label yellow" htmlFor="color5"></label>
                                            </div>
                                        </li>
                                    </ul>
                                </section>


                                <section className="widget widget-sizes mb-5">
                                    <h3 className="widget-title h4 mb-4">Shop by Sizes</h3>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size1" checked />
                                        <label className="custom-control-label" htmlFor="size1">L Large</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size2" />
                                        <label className="custom-control-label" htmlFor="size2">XL Extra Large</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size3" />
                                        <label className="custom-control-label" htmlFor="size3">M Medium</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size4" />
                                        <label className="custom-control-label" htmlFor="size4">S Small</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="size5" />
                                        <label className="custom-control-label" htmlFor="size5">XS Extra Small</label>
                                    </div>
                                </section>

                                <button type="button" className="btn btn-black btn-small">Filter</button>
                            </form>


                            <section className="widget widget-popular mb-5">
                                <h3 className="widget-title mb-4 h4">Popular Products</h3>
                                <a className="popular-products-item media" href="/product-single">
                                    <img src="assets/images/p-1.jpg" alt="" className="img-fluid mr-4" />
                                    <div className="media-body">
                                        <h6>Contrast <br />Backpack</h6>
                                        <span className="price">$45</span>
                                    </div>
                                </a>

                                <a className="popular-products-item media" href="/product-single">
                                    <img src="assets/images/p-2.jpg" alt="" className="img-fluid mr-4" />
                                    <div className="media-body">
                                        <h6>Hoodie with <br />Logo</h6>
                                        <span className="price">$45</span>
                                    </div>
                                </a>

                                <a className="popular-products-item media" href="/product-single">
                                    <img src="assets/images/p-3.jpg" alt="" className="img-fluid mr-4" />
                                    <div className="media-body">
                                        <h6>Traveller<br />Backpack</h6>
                                        <span className="price">$45</span>
                                    </div>
                                </a>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Shop;