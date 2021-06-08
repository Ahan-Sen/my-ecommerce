import React, { useEffect, useState } from "react";
import Product from "../components/Product";
//import LoadingBox from "../components/LoadingBox";
//import MessageBox from "../components/MessageBox";
import { listProducts } from "../redux/product/productActions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/auth/authActions";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <div>LOADING...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div class="row justify-content-center ml-0 mr-0">
            {products.map((product) => (
              <Product product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
