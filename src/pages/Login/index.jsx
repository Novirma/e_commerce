/* eslint-disable no-unused-vars */
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import  { useState, useEffect } from "react";
import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Kurma from "../../assets/img/LoginImageKurma.jpg"
import LogoHalal from "../../assets/img/LogoHalalECommerce.png"
import swal from "sweetalert";
import Footers from "../../components/footer/footer";

export const Login = () => {
  const navigate = useNavigate();

  const [link, setLink] = useState();

  useEffect(() => {
    const linkLS = localStorage.getItem("historyLink");
    linkLS ? setLink(linkLS) : setLink("/");
  }, []);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
 console.log(API_URL + "users?email=" + userDetails.email);
    axios
      .get(API_URL + "users?email=" + userDetails.email)
      .then((res) => {
        if (res.data.length === 0) {
          // console.log("test22222");
          swal("Gagal", "Akun belum terdaftar", "error");
        } else {
          // console.log("test22222");
          if (res.data[0].password !== userDetails.password) {
            swal("Gagal", "Email atau password salah", "error");
          } else {
            localStorage.removeItem("historyLink");
            localStorage.setItem("isLoggedin", true);
            localStorage.setItem("userId", res.data[0].id);
            localStorage.setItem("userName", res.data[0].firstName + " " + res.data[0].lastName);
            localStorage.setItem("alamat", res.data[0].address);
            swal("Sukses", "Berhasil masuk", "success");
            navigate(link);
          }
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  return (
    <>
    <div className="main">
      <Row className="Login">
        <Col className="Col1">
          <div className=" mb-2 section-one">
            <img src={Kurma} alt="Dragon Ball Logo" className="DBallImg"/>
            <p className="tokyo-text">
              Halal E-Commerce adalah toko penjualan produk dari Timur Tengah seperti kurma,air zam-zam dan platform konten media yang menyajikan informasi.
              <br />
              Di sini Anda dapat menjadi reseller produk dari Timur Tengah dengan harga yang menarik, so menunggu apalagi segera daftarkan dirimu dan jadilah pebisnis untuk menaikkan pendapatan kamu!
            </p>
            <p className=" tokyo-text mt-2">حَلَٰلًا طَيِّبًا</p>
          </div>
        </Col>
        <Col className="Col2">
          <div>
            <Form className="loginform" onSubmit={handleSubmit}>
              <div className="TokyoLogo">
                <img src={LogoHalal} alt={"Tokyo Vibes Logo"} className="gambar"></img>
              </div>
              <h3 className="masuk">Masuk</h3>
              <Form.Group className="formgroup">
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" className="form-input" type="email" required onChange={handleChange} />
              </Form.Group>

              <Form.Group className="formgroup">
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control id="password" type="password" required onChange={handleChange} />
              </Form.Group>
              <p className="lupa-sandi">Lupa Kata Sandi?</p>
              <Button className="loginbutton w-100" type="submit">
                MASUK
              </Button>
              <Link to="/register">
                <p className="mb-4 daftar">Belum punya akun? Daftar</p>
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
      <Footers/>
    </>
  );
};

export default Login;
