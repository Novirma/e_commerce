/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
// import "react-multi-carousel/lib/styles.css";
import Navbar from "../../components/navbar/navbar";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ReactLoading from "react-loading";
// import { SettingsPromo, SettingsSpSell } from "../../components/SettingCarouselHome";
import ReactPaginate from "react-paginate";
import Footers from "../../components/footer/footer";
import { rupiahLocale } from "../../utils/localeString";

const Home = () => {
  const [product, setProduct] = useState([
    {
      id: "",
      name: "",
      price: 0,
      stock: 0,
      spesification: {},
      description: "",
    },
  ]);

  const [allProduct, setAllProduct] = useState([
    {
      id: "",
      name: "",
      price: 0,
      stock: 0,
      spesification: {},
      description: "",
    },
  ]);

  const [params, setParams] = useState("");
  const [filteredAllProduct, setFilteredAllProduct] = useState([]);
  const [paginateAllProduct, setPaginateAllProduct] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const limit = 4;

  const [pageSearchCount, setPageSearchCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {

      const result = await axios.get(
        API_URL + `products?_page=1&_limit=${limit}`
      );
      setProduct(result.data);

      const allData = await axios.get(API_URL + `products`);
      setAllProduct(allData.data);

      const total = allData.data.length;
      setPageCount(Math.ceil(total / limit));
    };
    fetchData();
  }, []);

  const fetchAllProduct = async (currentPage) => {
    const result = await axios.get(
      API_URL + `products?_page=${currentPage}&_limit=${limit}`
    );
    return result.data;
  };

  const handleClickPaginate = async (data) => {
    let currentPage = data.selected + 1;
    const paginateData = await fetchAllProduct(currentPage);
    setProduct(paginateData);
  };

  const getParams = (s) => {
    setParams(s);

    if (s !== undefined || s !== "") {
      const filteredAllProduct = allProduct.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(s.toLowerCase());
      });
      setFilteredAllProduct(filteredAllProduct);

      const total = filteredAllProduct.length;
      setPageSearchCount(Math.ceil(total / limit));

      const paginateSearchProduct = filteredAllProduct.slice(0, limit);
      setPaginateAllProduct(paginateSearchProduct);
    } else {
      setFilteredAllProduct(product);
    }
  };

  const fetchSearchProduct = async (currentPage) => {
    const data = filteredAllProduct.slice(
      (currentPage - 1) * limit,
      limit * currentPage
    );
    return data;
  };

  const handleClickSearchPaginate = async (data) => {
    let currentPage = data.selected + 1;
    const paginateData = await fetchSearchProduct(currentPage);
    setPaginateAllProduct(paginateData);
  };

  return (
    <>
      {/* <h1>Ini Adalah HOME PAGE Bang</h1> */}
      <Navbar searchParams={getParams} />

      {

        <div>
          {params.length > 1 ? (
            <div>
              {
                paginateAllProduct.length > 0 ? (
                  <>
                    <div style={{ margin: 20, verticalAlign: "middle" }}>
                      <h2 className="mb-3 mt-2" style={{ marginLeft: 90 }}>
                        List Product Halal E-Commerce
                      </h2>
                      <div className="d-flex flex-wrap justify-content-center ">
                        {paginateAllProduct.map((item, index) => (
                          <div className="mb-4 cardProductAll">
                            <Link
                              to={`/details/${item.id}`}
                              className="linkCard"
                              draggable={false}
                            >
                              <Card
                                className="item1"
                                style={{
                                  width: "17rem",
                                  border: "none",
                                  borderRadius: 20,
                                  background: "#10840f",
                                  padding: 0,
                                  margin: "0px 5px",
                                }}
                              >
                                {item?.img ? (
                                  <Card.Img
                                    variant="top"
                                    height={"260"}
                                    src={`${item?.img}`}
                                    style={{ borderRadius: 15, padding: 0 }}
                                  />
                                ) : (
                                  <span>Loading...</span>
                                )}{" "}
                                <div
                                  style={{ margin: "10px 20px 10px 20px", color: "white" }}
                                >
                                  <div className="items-name text">{item.name}</div>
                                  <div className="mt-1">Harga Product</div>
                                  <div className="mt-1" style={{ fontWeight: "700" }}>
                                   Rp. {rupiahLocale(item.price)}
                                  </div>
                                  <div className="mt-1 mb-1">Stock : {item.stock}</div>
                                </div>
                              </Card>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handleClickPaginate}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ margin: 20, verticalAlign: "middle" }}>
                      <h2 className="mb-3 mt-2" style={{ marginLeft: 90 }}>
                        List Product Halal E-Commerce
                      </h2>
                      <div className="d-flex flex-wrap justify-content-center ">
                        Tidak dapat menemukan barang yang anda cari.
                      </div>
                    </div>
                  </>
                )

              } </div>
          ) : (
            <div style={{ margin: 20, verticalAlign: "middle" }}>
              <h2 className="mb-3 mt-2" style={{ marginLeft: 90 }}>
                List Product Halal E-Commerce
              </h2>
              <div className="d-flex flex-wrap justify-content-center ">
                {product.map((item, index) => (
                  <div className="mb-4 cardProductAll">
                    <Link
                      to={`/details/${item.id}`}
                      className="linkCard"
                      draggable={false}
                    >
                      <Card
                        className="item1"
                        style={{
                          width: "17rem",
                          border: "none",
                          borderRadius: 20,
                          background: "#10840f",
                          padding: 0,
                          margin: "0px 5px",
                        }}
                      >
                        {item?.img ? (
                          <Card.Img
                            variant="top"
                            height={"260"}
                            src={`${item?.img}`}
                            style={{ borderRadius: 15, padding: 0 }}
                          />
                        ) : (
                          <span>Loading...</span>
                        )}{" "}
                        <div
                          style={{ margin: "10px 20px 10px 20px", color: "white" }}
                        >
                          <div className="items-name text">{item.name}</div>
                          <div className="mt-1">Harga Product</div>
                          <div className="mt-1" style={{ fontWeight: "700" }}>
                            Rp.{rupiahLocale(item.price)}
                          </div>
                          <div className="mt-1 mb-1">Stock : {item.stock}</div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handleClickPaginate}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>


      }
      <Footers />
    </>
  );
};

export default Home;
