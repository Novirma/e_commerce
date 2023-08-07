/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/img/LogoHalalECommerce-transformed.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./index.module.css";
import Form from "react-bootstrap/Form";
import Gundambg from "../../assets/img/LoginImageKurma.jpg";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate,useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Container, Col, Row } from "react-bootstrap";
import fs from 'fs';
import  {  useEffect } from "react";


const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
    description: "",
    id_user:""
  });

  const [amount, setAmount] = useState(1);

  const [isLoggedin, setIsLoggedin] = useState();


  useEffect(() => {
    const isLoggedinLS = localStorage.getItem("isLoggedin");
    isLoggedinLS ? setIsLoggedin(true) : setIsLoggedin(false);

    const fetchData = async () => {
      const result = await axios.get(API_URL + "products/" + params.id);
      setProduct(result.data);
    };

    fetchData();
  }, [params.id]);

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.id]: event.target.value,
    });
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      swal(
        "Gagal",
        "Mohon Lengkapi Data Product .",
        "error"
      );
      event.preventDefault();
      event.stopProgation();
    }else{
      const data = {
        name: product.name,
        price: product.price,
        img: product.img,
        stock: product.stock,
        description: product.description,
        id_user:localStorage.getItem("userId")
      };
      axios
        .put(API_URL + "products/" + params.id, data)
        .then((res) => {
          swal("Sukses", "Sukses Daftar Product", "success");
          navigate("/");
        })
        .catch((error) => {
          console.log("Error", error);
        });

    }
   
    
  
  };

  return (
    <div className={Styles.main}>
      <Row>
        <Col className={Styles.Col1}>
          <div className=" mb-2 section-one">
            <h1 className="mb-5">EDIT PRODUCT</h1>
            <img
              src={"/src/assets/img/LoginImageKurma.jpg"}
              alt="Dragon Ball Logo"
              className="DBallImg"
            />
            <p className="tokyo-text">
              Halal E-Commerce adalah toko penjualan produk dari Timur Tengah
              seperti kurma,air zam-zam dan platform konten media yang
              menyajikan informasi.
              <br />
              Di sini Anda dapat menjadi reseller produk dari Timur Tengah
              dengan harga yang menarik, so menunggu apalagi segera daftarkan
              dirimu dan jadilah pebisnis untuk menaikkan pendapatan kamu!
            </p>
            <p className=" tokyo-text mt-2">حَلَٰلًا طَيِّبًا</p>
          </div>
        </Col>
        <Col className={Styles.Col2}>
          <div>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className={Styles.registerform}
            >
              <img className={Styles.logo} src={Logo} alt="logo" />

              <Form.Group className={Styles.inputform}>
                <Form.Label>Nama Product</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  required
                  onChange={handleChange}
                  value = {`${product.name}`}
                />
                <Form.Control.Feedback type="invalid">
                  Nama Product tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  id="price"
                  type="number"
                  required
                  onChange={handleChange}
                  value = {`${product.price}`}
                />
                <Form.Control.Feedback type="invalid">
                  Price tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  id="stock"
                  type="number"
                  required
                  onChange={handleChange}
                  value = {`${product.stock}`}
                />
                <Form.Control.Feedback type="invalid">
                  Stock tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  id="description"
                  type="text"
                  required
                  onChange={handleChange}
                  value = {`${product.description}`}
                />
                <Form.Control.Feedback type="invalid">
                  Deskripsi tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group className={Styles.inputform}>
                <Form.Label>Konfirmasi Kata Sandi</Form.Label>
                <Form.Control
                  id="c_password"
                  type="password"
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Konfirmasi kata sandi tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group> */}
              <Button className={Styles.daftar} type="submit">
                Tambahkan
              </Button>

              <Link
                to="/"
                className={Styles.masuk}
                style={{ textDecoration: "none" }}
              >
                <p className={Styles.masuk}>Sudah Punya Akun? Masuk</p>
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditProduct;
