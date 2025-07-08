import { useEffect, useState } from "react";
import style from "./HomeThreeImage.module.css";
import axios from "axios";

const HomeThreeImage = () => {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://appy.trycatchtech.com/v3/maganlalchikki/banner_image")
      .then((response) => {
        console.log("Raw response:", response.data);

        let data = response.data;

        // If data is a string (e.g. with extra HTML), sanitize it
        if (typeof data === "string") {
          data = data.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
          try {
            data = JSON.parse(data);
          } catch (e) {
            console.error("JSON parse failed:", e);
            data = [];
          }
        }

        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error("Expected array, but got:", data);
          setData([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={style.imgDiv}>
        {Array.isArray(getData) &&
          getData.map((product) => (
            <div className={style.relative} key={product.id}>
              <img
                src={product.banner_image}
                className={style.img}
                alt={product.title || "Banner"}
              />
              <div className={style.whiteBG}></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default HomeThreeImage;
