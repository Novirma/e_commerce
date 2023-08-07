/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/img/LogoHalalECommerce-transformed.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./index.module.css";
import Form from "react-bootstrap/Form";
import Kurma from "../../assets/img/LoginImageKurma.jpg";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Container, Col, Row } from "react-bootstrap";
import fs from "fs";
import { useEffect } from "react";
import Navbars2 from "../../components/navbar/navbar2";
import Footers from "../../components/footer/footer";
import sha256 from "sha256";

const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
    description: "",
    id_user: "",
  });

  const [amount, setAmount] = useState(1);

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [img, setimg] = useState("");
  const [file, setFile] = useState(null);

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

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (
      isLoggedin === true &&
      product.id_user === localStorage.getItem("userId")
    ) {
      if (form.checkValidity() === false) {
        swal("Gagal", "Mohon Lengkapi Data Product .", "error");
        event.preventDefault();
        event.stopProgation();
      } else {

        const fileImg = await uploadImage();
        const imgMasuk = fileImg ? fileImg : product.img //cek jika gambar tidak diupload lagi
        const data = {
          name: product.name,
          price: product.price,
          img: imgMasuk,
          stock: product.stock,
          description: product.description,
          id_user: localStorage.getItem("userId"),
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
    } else if (
      isLoggedin === true &&
      product.id_user !== localStorage.getItem("userId")
    ) {
      swal("Gagal", "Anda Bukan Pemilik Barang Ini", "error");
    } else {
      localStorage.setItem("historyLink", `/details/${params.id}`);
      swal(
        "Gagal",
        "Silahkan login terlebih dahulu untuk lanjut belanja",
        "error"
      );
      navigate("/login");
    }
    
  };

  return (
    <>
    <Navbars2 />
    <div className={Styles.main}>
      <Row>
        <Col className={Styles.Col1}>
          <div className=" mb-2 section-one">
            <h1 className="mb-5">EDIT PRODUCT</h1>
            <img
              src={Kurma}
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
                  value={`${product.name}`}
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
                  value={`${product.price}`}
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
                  value={`${product.stock}`}
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
                  value={`${product.description}`}
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
                Edit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
    <Footers/>
    </>
  );
};

export default EditProduct;
