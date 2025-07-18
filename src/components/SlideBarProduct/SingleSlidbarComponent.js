import style from "./SingleSlidbarComponent.module.css";
import { useEffect, useState } from "react";
import getAPI from "../../api/getapi";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

const SingleSlidbarComponent = ({ apiId, icons, title, bgColor }) => {
  const [getData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    getAPI(`product_list?category_id=${apiId}`)
      .then((response) => {
        let rawData = response.data;

        // If it's a string (with potential <script>), fix it
        if (typeof rawData === "string") {
          const jsonEndIndex = rawData.lastIndexOf("]") + 1;
          const pureJSON = rawData.slice(0, jsonEndIndex);
          try {
            const parsed = JSON.parse(pureJSON);
            setData(Array.isArray(parsed) ? parsed : []);
          } catch (e) {
            console.error("❌ Failed to parse cleaned JSON:", e);
            setData([]);
          }
        } else if (Array.isArray(rawData)) {
          setData(rawData);
        } else {
          console.error("❌ Unexpected data format:", rawData);
          setData([]);
        }
      })
      .catch((error) => {
        console.error("❌ API Error:", error);
        setData([]);
      });
  }, [apiId]);

  const totalPages = Math.ceil(getData.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleData = getData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={style.sliderContainer}>
      <div
        className={`${style.sliderHeader} ${
          bgColor === "green"
            ? style.greenBg
            : bgColor === "red"
            ? style.redBg
            : bgColor === "blue"
            ? style.blueBg
            : ""
        }`}
      >
        <h2>
          <img src={icons} alt="icon" />
          {title}
        </h2>
        <div className={style.sliderButtons}>
          <button onClick={handlePrev}>
            <IoMdArrowDropleft />
          </button>
          <button onClick={handleNext}>
            <IoMdArrowDropright />
          </button>
        </div>
      </div>

      <div className={style.productsContainer}>
        {visibleData.map((pData, index) => (
          <div key={index} className={style.productCard}>
            <img
              src={pData.images}
              alt={pData.title}
              className={style.productImage}
            />
            <div className={style.productText}>
              <Link
                to="/carddetails"
                style={{ textDecoration: "none", color: "black" }}
                state={{ product: pData }}
              >
                <h3 className={style.Title}>{pData.title}</h3>
              </Link>
              <p className={style.price}>₹{pData.price}.00</p>
            </div>
            <hr style={{ width: "100%", margin: "5px 0 0 0" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleSlidbarComponent;
