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
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Container, Col, Row } from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";

const AddProduct = () => {
  const navigate = useNavigate();

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [img,setimg] = useState("");

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
    description: "",
    id_user:""
  });

  const [file, setFile] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSize = 100 * 1024; // 100 KB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
        const reader = new FileReader();
        setimg(selectedFile.name);
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
          setFile(selectedFile);
        };
        reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setImagePreviewUrl("");
      event.target.value = null; // Reset input file
      swal(
        "Gagal",
        "Tipe file harus berupa PNG atau JPG dengan ukuran maksimal 100 KB.",
        "error"
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false || file === null) {
      swal(
        "Gagal",
        "Mohon Lengkapi Data Product dan Pilih Gambar PNG atau JPG dengan Ukuran Maksimal 100 KB.",
        "error"
      );
      event.preventDefault();
      event.stopProgation();
    } else {
        const fileName = uuidv4() + "-" + file.name;
       
        const data = {
            name: productDetails.name,
            price: productDetails.price,
            stock: productDetails.stock,
            img: fileName,
            description: productDetails.description,
            id_user:localStorage.getItem("userId")
          };
          axios
            .post(API_URL + "products", data)
            .then((res) => {
              swal("Sukses", "Sukses Daftar Product", "success");
              // navigate("/");
            })
            .catch((error) => {
              console.log("Error", error);
            });
    //   }).catch((error) => {
    //     console.log("Error uploading file", error);
    //   });
    }
  };

  return (<div>
        <Navbar  />
    <div className={Styles.main}>
      <Row>
        <Col className={Styles.Col1}>
          <div className=" mb-2 section-one">
            <h1 className="mb-5">TAMBAHKAN PRODUCT</h1>
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
                />
                <Form.Control.Feedback type="invalid">
                  Stock tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                  id="img"
                  type="file"
                  required
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Form.Control.Feedback type="invalid">
                  Gambar tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  id="description"
                  type="text"
                  required
                  onChange={handleChange}
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
    </div>
  );
};

export default AddProduct;
