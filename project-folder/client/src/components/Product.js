import React from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
} from "reactstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const { _id, name, image, price, rating } = product;
  return (
    <div className="col-sm-3 col-10 mt-4 offset-1 offset-sm-0">
      <Card className="bg-light">
        <Link to={`/product/${product._id}`}>
          <CardImg top src={image} alt={name} />
        </Link>
        <CardBody>
          <Link to={`/product/${product._id}`}>
            <CardTitle tag="h5">{name}</CardTitle>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div>
            <h5>${price}</h5>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
