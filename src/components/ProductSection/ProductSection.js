import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import style from "./ProductSection.module.css";
import getAPI from "../../api/getapi.js";
import { Row, Col } from "react-bootstrap";
import { IoMdArrowDropright, IoMdArrowDropup } from "react-icons/io";
import { FaEye, FaHeart } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import ViewModal from "../ViewModal/ViewModal.js";
import { Spinner } from "react-bootstrap";

const ProductSection = ({ apiId, img, buttonValue, activeFilter }) => {
  const [viewShow, setViewShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [getData, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAPI(`product_list?category_id=${apiId}`)
      .then((response) => {
        let raw = response.data;

        if (typeof raw === "string") {
          const jsonEnd = raw.lastIndexOf("]");
          const cleaned = raw.slice(0, jsonEnd + 1);

          try {
            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed)) {
              setData(parsed);
            } else {
              console.error("❌ Parsed JSON is not an array:", parsed);
              setData([]);
              setError("Parsed JSON is not an array");
            }
          } catch (err) {
            console.error("❌ JSON parse error:", err);
            setData([]);
            setError("JSON parse error");
          }
        } else if (Array.isArray(raw)) {
          setData(raw);
        } else {
          console.error("❌ Unexpected API response:", raw);
          setData([]);
          setError("Unexpected API response");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API call failed:", err);
        setData([]);
        setError("API call failed");
        setLoading(false);
      });
  }, [apiId]);

  // Latest Products: Moves odd id products first. Best Selling: Sorts by highest price. Top Rating: Sorts by lowest price.Featured Products: Moves even id products first.

const getFilteredProducts = (filteredData) => {
  // Ensure filteredData is always an array
  const data = Array.isArray(filteredData) ? filteredData : [];

  if (activeFilter === "Latest Product") {
    return [
      ...data.filter((item) => item.id % 2 !== 0),
      ...data.filter((item) => item.id % 2 === 0),
    ];
  } else if (activeFilter === "Best Selling") {
    return [...data].sort((a, b) => b.price - a.price);
  } else if (activeFilter === "Top Rating") {
    return [...data].sort((a, b) => a.price - b.price);
  } else if (activeFilter === "Featured Products") {
    return [
      ...data.filter((item) => item.id % 2 === 0),
      ...data.filter((item) => item.id % 2 !== 0),
    ];
  }

  return data;
};

  const addToWishlist = (product) => {
    // getItem // Retrieve data
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];  //JSON.parse() converts the stored JSON string into an array.

    // .some() iterates through the wishlist array to see if any item has the same id as the product being added.If true, it means the product is already in the wishlist.
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (isAlreadyInWishlist) {
      navigate("/wishlist"); // Redirect to wishlist if already added
    } else {
      wishlist.push(product);
      // setItem // Store data
      localStorage.setItem("wishlist", JSON.stringify(wishlist));  //JSON.stringify() Converts the array back to a JSON string and stores it in localStorage.

      // Show message & hide after 2 seconds
      setWishlistMessage("Product added to wishlist!");
      setTimeout(() => setWishlistMessage(""), 2000);
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    setCartMessage("Product added to cart!");
    setTimeout(() => setCartMessage(null), 2000);
  };

  const [showAllProducts, setShowAllProducts] = useState(false); // NEW STATE

  const getDisplayedProducts = () => {
    if (showAllProducts) return getData;
    if (windowWidth < 700) return getData.slice(0,4);
    else if (windowWidth < 900) return getData.slice(0, 6);
    return getData.slice(0, 8);
  };

  const toggleView = () => {
    setShowAllProducts(!showAllProducts); // Toggle between showing all or limited products
  };

  // Define dynamic button text based on apiId
  const viewAllButtonText = {
    1: "View All Chikki",
    2: "View All Fudge",
    4: "View All Dry Fruit Roll",
  };

  const viewLessButtonText = {
    1: "View Less Chikki",
    2: "View Less Fudge",
    4: "View Less Dry Fruit Roll",
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Spinner from react-bootstrap */}
        <Spinner animation="border" variant="danger" />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Wishlist Message Popup */}
      {wishlistMessage && (
        <div className={style.wishlistMessage}>{wishlistMessage}</div>
      )}

      {cartMessage && <div className={style.cartMessage}>{cartMessage}</div>}

      <div className={style.Mdiv}>
        <div className={style.FlexDiv} data-api-id={apiId}>
          <div className={style.Idiv}>
            <img src={img} alt="Rose Chikki" />
          </div>
          <div className={style.Pdiv}>
            <Row xl={4} md={3} xs={2}>
              {getFilteredProducts(getDisplayedProducts()).map(
                (Cdata, index) => (
                  <Col key={index} className={style.col}>
                    <div className={style.Sdiv}>
                      <div className={style.RelativeDiv}>
                        <img
                          src={Cdata.images}
                          className={style.Pimg}
                          alt={Cdata.title}
                        />
                        <div className={style.AbsoluteDiv}>
                          <div className={style.ButtonsKing}>
                            {/* QuickView Button */}
                            <button
                              className={style.AbsButton}
                              onClick={() => {
                                setSelectedData(Cdata);
                                setViewShow(true);
                              }}
                            >
                              <FaEye />
                              <div className={style.Pop1}>QuickView</div>
                            </button>
                            <br />
                            {/* Wishlist Button */}
                            <button
                              className={style.AbsButton}
                              onClick={() => addToWishlist(Cdata)}
                            >
                              <FaHeart />
                              <div className={style.Pop2}>WishList</div>
                            </button>
                            <br />
                            {/* Add to Cart Button */}
                            <button
                              className={style.AbsButton}
                              onClick={() => addToCart(Cdata)}
                            >
                              <IoBagCheckOutline />
                              <div className={style.Pop3}>Add To Cart</div>
                            </button>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/carddetails"
                        style={{ textDecoration: "none", color: "black" }}
                        state={{ product: Cdata }}
                      >
                        <p className={style.Title}>{Cdata.title}</p>
                      </Link>
                      <hr style={{ width: "100%", margin: "15px 0px" }} />
                      <p className={style.Rupee}>₹{Cdata.price}.00</p>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </div>
        </div>
        {/* View All / View Less Button */}
        <button className={style.ViewButton} onClick={toggleView}>
          {showAllProducts
            ? viewLessButtonText[apiId] || "View Less"
            : viewAllButtonText[apiId] || "View All"}{" "}
          {showAllProducts ? (
            <IoMdArrowDropup style={{ marginLeft: "7px", fontSize: "17px" }} />
          ) : (
            <IoMdArrowDropright
              style={{ marginLeft: "7px", fontSize: "17px" }}
            />
          )}
        </button>
      </div>

      {/* View Modal for QuickView */}
      {selectedData && (
        <ViewModal
          show={viewShow}
          onHide={() => setViewShow(false)}
          Cdata={selectedData}
        />
      )}
    </>
  );
};

export default ProductSection;



/*

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { fetchProducts } from "../../redux/productsSlice"; // Import fetch action
import { Link, useNavigate } from "react-router-dom";
import style from "./ProductSection.module.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { IoMdArrowDropright, IoMdArrowDropup } from "react-icons/io";
import { FaEye, FaHeart } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import ViewModal from "../ViewModal/ViewModal.js";

const ProductSection = ({ apiId, img, buttonValue, activeFilter }) => {
  const [viewShow, setViewShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch(); // Initialize the dispatch function
  const { data: getData, loading, error } = useSelector((state) => state.products); // Access Redux state

  useEffect(() => {
    dispatch(fetchProducts(apiId)); // Dispatch the action to fetch products when component mounts

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [apiId, dispatch]);

  // Filtering logic (same as before)
  const getFilteredProducts = (filteredData) => {
    if (activeFilter === "Latest Product") {
      return [
        ...filteredData.filter((item) => item.id % 2 !== 0),
        ...filteredData.filter((item) => item.id % 2 === 0),
      ];
    } else if (activeFilter === "Best Selling") {
      return [...filteredData].sort((a, b) => b.price - a.price);
    } else if (activeFilter === "Top Rating") {
      return [...filteredData].sort((a, b) => a.price - b.price);
    } else if (activeFilter === "Featured Products") {
      return [
        ...filteredData.filter((item) => item.id % 2 === 0),
        ...filteredData.filter((item) => item.id % 2 !== 0),
      ];
    }

    return filteredData;
  };

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (isAlreadyInWishlist) {
      navigate("/wishlist");
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      setWishlistMessage("Product added to wishlist!");
      setTimeout(() => setWishlistMessage(""), 2000);
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    setCartMessage("Product added to cart!");
    setTimeout(() => setCartMessage(null), 2000);
  };

  const [showAllProducts, setShowAllProducts] = useState(false);

  const getDisplayedProducts = () => {
    if (showAllProducts) return getData;
    if (windowWidth < 700) return getData.slice(0, 4);
    else if (windowWidth < 900) return getData.slice(0, 6);
    return getData.slice(0, 8);
  };

  const toggleView = () => {
    setShowAllProducts(!showAllProducts);
  };

  const viewAllButtonText = {
    1: "View All Chikki",
    2: "View All Fudge",
    4: "View All Dry Fruit Roll",
  };

  const viewLessButtonText = {
    1: "View Less Chikki",
    2: "View Less Fudge",
    4: "View Less Dry Fruit Roll",
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" variant="danger" />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {wishlistMessage && <div className={style.wishlistMessage}>{wishlistMessage}</div>}
      {cartMessage && <div className={style.cartMessage}>{cartMessage}</div>}

      <div className={style.Mdiv}>
        <div className={style.FlexDiv} data-api-id={apiId}>
          <div className={style.Idiv}>
            <img src={img} alt="Rose Chikki" />
          </div>
          <div className={style.Pdiv}>
            <Row xl={4} md={3} xs={2}>
              {getFilteredProducts(getDisplayedProducts()).map((Cdata, index) => (
                <Col key={index} className={style.col}>
                  <div className={style.Sdiv}>
                    <div className={style.RelativeDiv}>
                      <img src={Cdata.images} className={style.Pimg} alt={Cdata.title} />
                      <div className={style.AbsoluteDiv}>
                        <div className={style.ButtonsKing}>
                          <button
                            className={style.AbsButton}
                            onClick={() => {
                              setSelectedData(Cdata);
                              setViewShow(true);
                            }}
                          >
                            <FaEye />
                            <div className={style.Pop1}>QuickView</div>
                          </button>
                          <br />
                          <button
                            className={style.AbsButton}
                            onClick={() => addToWishlist(Cdata)}
                          >
                            <FaHeart />
                            <div className={style.Pop2}>WishList</div>
                          </button>
                          <br />
                          <button
                            className={style.AbsButton}
                            onClick={() => addToCart(Cdata)}
                          >
                            <IoBagCheckOutline />
                            <div className={style.Pop3}>Add To Cart</div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Link to="/carddetails" style={{ textDecoration: "none", color: "black" }} state={{ product: Cdata }}>
                      <p className={style.Title}>{Cdata.title}</p>
                    </Link>
                    <hr style={{ width: "100%", margin: "15px 0px" }} />
                    <p className={style.Rupee}>₹{Cdata.price}.00</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <button className={style.ViewButton} onClick={toggleView}>
          {showAllProducts ? viewLessButtonText[apiId] || "View Less" : viewAllButtonText[apiId] || "View All"}{" "}
          {showAllProducts ? (
            <IoMdArrowDropup style={{ marginLeft: "7px", fontSize: "17px" }} />
          ) : (
            <IoMdArrowDropright style={{ marginLeft: "7px", fontSize: "17px" }} />
          )}
        </button>
      </div>

      {selectedData && (
        <ViewModal show={viewShow} onHide={() => setViewShow(false)} Cdata={selectedData} />
      )}
    </>
  );
};

export default ProductSection;


*/