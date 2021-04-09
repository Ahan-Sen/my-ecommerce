import React, { useEffect, useState } from "react";
import Product from "../components/Product";
//import LoadingBox from "../components/LoadingBox";
//import MessageBox from "../components/MessageBox";
import { listProducts } from "../redux/product/productActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <div>
          <div class="row justify-content-center">
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
