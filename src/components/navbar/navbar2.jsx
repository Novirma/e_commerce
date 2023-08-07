/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/img/iconwebhalal-transformed.png"
import rajaSalman from "../../assets/img/fotoRajaSalman.jpg"
// import PropTypes from 'prop-types';
import "./navbar.css";
import "../styles/Modal.css";
import logoWA from "../../assets/img/whatsapp.png"

const Navbars2 = () => { 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
        <Nav className="" style={{ width: "100%"}}>
          <div  className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
          <Link to="/" className="mx-5">
              <Navbar.Brand>
                <img className="logo mx-3" src={logoIcon} width={50} alt="Navigation Pic"></img>
                <span className="justify-content-center align-items-center" style={{ color:"white" }}>Halal E-Commerce</span>
              </Navbar.Brand>
            </Link>
          </ul>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 justify-content-end">
            <ul className="navbar-nav ml-auto">
          <Nav.Link as={Link} to="/addProduct" style={{ color: "#fff", fontWeight: "400" }}>
            Tambah Product
          </Nav.Link>
          <Nav.Link as={Link} to="/" style={{ color: "#fff", fontWeight: "400" }}>
            <button className="button-request" style={{ color: "#fff", fontWeight: "400" }} onClick={handleLogout}>
              Keluar
            </button>
          </Nav.Link>
          <Nav.Link as={Link} to="#" className="ml-auto">
            <img className="profile-nav" src={rajaSalman} alt="profile nav"></img>
            <span className="name-nav">{userName}</span>
          </Nav.Link>
          </ul>
          </div>
        </Nav>
      )
    } else {
      return (
        <Nav className="justify-content-end " style={{ width: "100%" }}>
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
      <Navbar collapseOnSelect expands="sm" className="navbars " style={{ heigth:"fit-content" }}>
        <Container className="ml-auto navlinks">
          {showContent()}
        </Container>
        <Modal centered className="modals" show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="d-grid text-center modal-body">
              <div className="title">Request Barang</div>
              <div className="text">Untuk request barang bisa dilakukan melalui chat.</div>
              <div className="button">
                <a href="https://wa.me/6288221500153">
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
    </>
  );
};

export default Navbars2;
