/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import { Container, Col, Row } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    c_password: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      swal("Gagal", "Mohon Lengkapi Formulirnya", "error");
      event.preventDefault();
      event.stopPropagation();
    } else if (userDetails.password !== userDetails.c_password) {
      swal("Gagal", "Konfirmasi password belum benar", "error");
    } else {
      const data = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        address: userDetails.address,
        email: userDetails.email,
        password: userDetails.password,
      };
      axios
        .post(API_URL + "users", data)
        .then((res) => {
          const cartSummary = {
            userid: res.data.id,
          };
          swal("Sukses", "Sukses Daftar Akun", "success");
          navigate("/login");
        })
        .catch((error) => {
          console.log("Error yaa", error);
        });
    }
  };

  return (
    <div className={Styles.main}>
      <Row>
        <Col className={Styles.Col1}>
          <div className=" mb-2 section-one">
            <h1 className="mb-5">DAFTAR</h1>
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
                <Form.Label>Nama Depan</Form.Label>
                <Form.Control
                  id="firstName"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Nama depan tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Nama Belakang</Form.Label>
                <Form.Control
                  id="lastName"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Nama Belakang tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  id="address"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Alamat tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Email tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Kata sandi tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={Styles.inputform}>
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
              </Form.Group>
              <Button className={Styles.daftar} type="submit">
                DAFTAR
              </Button>

              <Link
                to="/login"
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

export default Register;
