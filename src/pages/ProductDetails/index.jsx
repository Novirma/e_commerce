/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbars2 from "../../components/navbar/navbar2";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./index.module.css";
// import Productex from "../../assets/productex.png";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import rajaSalman from "../../assets/img/fotoRajaSalman.jpg"
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { DashCircle, Trash, PlusCircle } from "react-bootstrap-icons";

import { API_URL } from "../../utils/constants";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footers from "../../components/footer/footer";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
    description: "",
    id: "",
    id_user: "",
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
  }, []);

  const buyNow = () => {
    if (
      isLoggedin === true &&
      product.id_user !== localStorage.getItem("userId")
    ) {
      //   const totalPrice = product.price * amount;

      //   const data = {
      //     totalsummary: {
      //       sumAmount: amount,
      //       sumPrice: totalPrice,
      //     },
      //   };
      const updatedStock = product.stock - amount;
      const updatedProductData = { stock: updatedStock };
      console.log(updatedStock);
      console.log(product.id);
      const result = axios
        .patch(API_URL + "products/" + product.id, updatedProductData)
        .then((response) => {
          swal(
            "Sukses",
            `Pembelian Sukses, stock ${product.name} Telah Berkurang`,
            "success"
          );
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else if (
      isLoggedin === true &&
      product.id_user === localStorage.getItem("userId")
    ) {
      swal("Gagal", "Anda tidak bisa membeli barang sendiri", "error");
    } else {
      localStorage.setItem("historyLink", `/details/${product.id}`);
      swal(
        "Gagal",
        "Silahkan login terlebih dahulu untuk lanjut belanja",
        "error"
      );
      navigate("/login");
    }
  };

  const deleteProduct = () => {
    const idProduct = product.id;
    if (
      isLoggedin === true &&
      product.id_user === localStorage.getItem("userId")
    ) {
      swal({
        title: "Konfirmasi",
        text: "Anda yakin ingin menghapus produk ini?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(API_URL + "products/" + idProduct)
            .then((response) => {
              swal("Sukses", "Produk berhasil dihapus.", "success");
              // Lakukan pembaruan UI jika diperlukan
              navigate("/");
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
            });
        }
      });
    } else if (
      isLoggedin === true &&
      product.id_user !== localStorage.getItem("userId")
    ) {
      swal("Gagal", "Anda Bukan Pemilik Barang Ini", "error");
    } else {
      localStorage.setItem("historyLink", `/details/${product.id}`);
      swal(
        "Gagal",
        "Silahkan login terlebih dahulu untuk lanjut belanja",
        "error"
      );
      navigate("/login");
    }
  };

  const editProduct = () => {
    const idProduct = product.id;
    if (
      isLoggedin === true &&
      product.id_user === localStorage.getItem("userId")
    ) {
      navigate(`/editProduct/${idProduct}`);
    } else if (
      isLoggedin === true &&
      product.id_user !== localStorage.getItem("userId")
    ) {
      swal("Gagal", "Anda Bukan Pemilik Barang Ini", "error");
    } else {
      localStorage.setItem("historyLink", `/details/${product.id}`);
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
        <div className={Styles.col1}>
          {product.img ? (
            <img
              className={Styles.productex}
              src={`${product.img}`}
              alt="background gundam"
            ></img>
          ) : (
            <span>Loading....</span>
          )}
        </div>
        <div className={Styles.col2}>
          <div className={Styles.col2row1}>
            <div className={Styles.col2names}>{product.name}</div>
            <div className={Styles.col2price}>
              Rp{product.price.toLocaleString("id-ID")}
            </div>
          </div>
          <div className={Styles.col2row1}>
            <div className={Styles.col2name}>Keterangan :</div>
            <div className={Styles.col2ket}>{product.description}</div>
          </div>
          <div>
            <div className={Styles.reviewTitle}>Ulasan dari Pembeli</div>
            <div className={Styles.userBuyer}>
              <img
                src={rajaSalman}
                alt="Lionel Messi"
              ></img>
              <span>Raja Salman</span>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              gravida purus metus, consequat volutpat diam consequat vitae.
              Integer convallis lobortis urna et pharetra. Quisque eu posuere
              lorem. Suspendisse congue eleifend urna et tincidunt. Aliquam
              aliquam placerat mollis. Praesent eu venenatis velit. Proin
              ullamcorper feugiat erat, vitae ultricies orci molestie in.
              Pellentesque est diam, vestibulum quis dignissim sed, sodales quis
              ex.{" "}
            </div>
          </div>
        </div>
        <div className={Styles.col3}>
          <div className={Styles.col3box}>
            <div className={Styles.col3list}>
              <div className={Styles.col3data}>
                <div className={Styles.col3datakey}>Total stok</div>
                <div className={Styles.col3datavalue}>: {product.stock}</div>
              </div>
              <Row style={{ height: "100%", marginTop: "20px" }}>
                <Col xs={20} className="d-flex justify-content-between">
                  <DashCircle
                    size={20}
                    color={"red"}
                    onClick={() =>
                      amount === 1 ? setAmount(1) : setAmount(amount - 1)
                    }
                  />
                  <span>{amount}</span>
                  <PlusCircle
                    size={20}
                    color={"green"}
                    onClick={() =>
                      setAmount(
                        amount >= product.stock ? product.stock : amount + 1
                      )
                    }
                  />
                </Col>
              </Row>
              <Button className={Styles.buynow} onClick={buyNow}>
                Beli Sekarang
              </Button>
              <Button className={Styles.buynow} onClick={editProduct}>
                Edit Product
              </Button>
              <Button className={Styles.buynow} onClick={deleteProduct}>
                Delete Product
              </Button>
              {/* <Button className={Styles.addcart} onClick={addCart}>
                Tambah Keranjang
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <Footers/>
    </>
  );
};

export default ProductDetails;
