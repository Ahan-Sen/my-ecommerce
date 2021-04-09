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

export default function Product({ product }) {
  const { _id, name, image, price, rating } = product;
  return (
    <div className="col-sm-3 col-10 mt-4 offset-1 offset-sm-0  ">
      <Card className="bg-light">
        <CardImg top src={image} alt={name} />
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div>
            <h5>${price}</h5>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
