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
import sha256 from "sha256";

const AddProduct = () => {
  const navigate = useNavigate();

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [img, setimg] = useState("");


  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
    description: "",
    id_user: ""
  });

  const [file, setFile] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.id]: event.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSize = 100 * 1024; // 100 KB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setimg(selectedFile);

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

  const uploadImage = async () => {

    if (!img) {
      return null
    }

    const api_secret = "gC0bLHJYEdjeUrobODte5H1TzQ8";
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signatureString = `timestamp=${timestamp}${api_secret}`
    const signature = sha256(signatureString)

    const formData = new FormData();
    formData.append('file', img);
    formData.append('api_key', "429798226541471");
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)
    // formData.append("upload_preset", "hjoaxghq");
    // formData.append("api_secret", 'gC0bLHJYEdjeUrobODte5H1TzQ8');

    const endpoint = 'https://api.cloudinary.com/v1_1/dnieojkpb/image/upload'
    const options = {
      method: 'POST',
      body: formData
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    console.log(result.secure_url);
    return result.secure_url
  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    const form = event.currentTarget;
    setValidated(true);
    // if (form.checkValidity() === false || file === null) {
    //   swal(
    //     "Gagal",
    //     "Mohon Lengkapi Data Product dan Pilih Gambar PNG atau JPG dengan Ukuran Maksimal 100 KB.",
    //     "error"
    //   );
    //   event.preventDefault();
    //   event.stopProgation();
    // } else {


    const fileImg = await uploadImage();
    console.log(fileImg);


    const data = {
      name: productDetails.name,
      price: productDetails.price,
      stock: productDetails.stock,
      img: fileImg,
      description: productDetails.description,
      id_user: localStorage.getItem("userId")
    };

    axios
      .post(API_URL + "products", data)
      .then((res) => {
        swal("Sukses", "Sukses Daftar Product", "success");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error", error);
      });
    // }
  };

  const [uploadedImage, setUploadedImage] = useState(null);


  return (<div>
    <Navbar />
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
                {/* <Form.File
                  id="custom-file"
                  label="Pilih gambar"
                  custom
                  onChange={handleImageUpload}
                  accept="image/*"
                /> */}
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

             
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  </div>
  );
};

export default AddProduct;
