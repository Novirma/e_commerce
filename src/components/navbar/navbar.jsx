/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import rajaSalman from "../../assets/img/fotoRajaSalman.jpg"
import logoIcon from "../../assets/img/LogoHalalECommerce-transformed.png"
import logoWA from "../../assets/img/whatsapp.png"
// import PropTypes from 'prop-types';
import "./navbar.css";
import "../styles/Modal.css";

const Navbars = ({searchParams}) => { 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isLoggedin, setIsLoggedin] = useState()
  const [userName, setUserName] = useState()

  useEffect(() => {
    const isLoggedinLS = localStorage.getItem('isLoggedin');
    isLoggedinLS ? setIsLoggedin(true) : setIsLoggedin(false);

    if(isLoggedinLS) setUserName(localStorage.getItem('userName'))
  }, [isLoggedin]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedin")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")

    setIsLoggedin(false)
  }

  const showContent = () => {
    if(isLoggedin) {
      return (
        <Nav className="justify-content-end " style={{ width: "100%" }}>
          <Nav.Link>
            <button className="button-request" style={{ color: "#fff", fontWeight: "400" }} onClick={handleShow}>
              Request Barang
            </button>
          </Nav.Link>
          <Nav.Link as={Link} to="/addProduct" style={{ color: "#fff", fontWeight: "400" }}>
            Tambah Product
          </Nav.Link>
          <Nav.Link as={Link} to="/" style={{ color: "#fff", fontWeight: "400" }}>
            <button className="button-request" style={{ color: "#fff", fontWeight: "400" }} onClick={handleLogout}>
              Keluar
            </button>
          </Nav.Link>
          <Nav.Link as={Link} to="#">
            <img className="profile-nav" src={rajaSalman} alt="profile nav"></img>
            <span className="name-nav">{userName}</span>
          </Nav.Link>
        </Nav>
      )
    } else {
      return (
        <Nav className="justify-content-end " style={{ width: "100%" }}>
          <Nav.Link as={Link} to="/about" style={{ color: "#fff", fontWeight: "400" }}>
            Tentang Kami
          </Nav.Link>
          <Nav.Link as={Link} to="/register" style={{ color: "#fff", fontWeight: "400" }}>
            Daftar
          </Nav.Link>
          <Nav.Link as={Link} to="/login" style={{ color: "#fff", fontWeight: "400" }}>
            Masuk
          </Nav.Link>
        </Nav>
      )
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expands="sm" className="navbars ">
        <Container className="ml-auto navlinks">
          {showContent()}
        </Container>
        <Modal centered className="modals" show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="d-grid text-center modal-body">
              <div className="title">Request Barang</div>
              <div className="text">Untuk request barang bisa dilakukan melalui chat.</div>
              <div className="button">
                <a href="https://wa.me/6285263174705">
                  <img style={{ width: "125px" }} src={logoWA} alt="WhatsApp Logo"></img>
                  <div className="modal-button">
                    <span>Chat Penjual</span>
                  </div>
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Navbar>
      <Navbar className="nav-bottoms">
        <Container>
          <Nav className="searchable d-flex align-items-center justify-content-center">
            <Link to="/" className="mx-5">
              <Navbar.Brand>
                <img className="logo mx-3" src={logoIcon} alt="Navigation Pic"></img>
                <span className="tokyoVibes justify-content-center align-items-center">Halal E-Commerce</span>
              </Navbar.Brand>
            </Link>
            <Form className="mx-4 search">
              <Form.Control 
                type="search" 
                placeholder="Search" 
                className="search" 
                aria-label="Search"
                onChange={event => searchParams(event.target.value)}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              />
            </Form>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
