import express from "express";
import cors from "cors";

const app = express();

app.use(cors());


//Server side values
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;


//Exercise 1
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = (newItemPrice + cartTotal).toString();
  res.send(totalCartPrice);
});


//Exercise 2
const checkDiscountStatus = (cartTotal, isMember) => {
  if (isMember) {
    return (cartTotal - ((cartTotal * discountPercentage) / 100)).toString();
  } else {
    return "No discount";
  }
};

app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  res.send(checkDiscountStatus(cartTotal, isMember));
});


//Exercise 3
const checkTaxRate = (cartTotal) => {
    return ((cartTotal * taxRate) / 100).toString();
};

app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(checkTaxRate(cartTotal));
});


//Exercise 4
const checkShippingMethod = (shippingMethod, distance) => {
    if(shippingMethod === 'express') {
      return (distance / 100).toString()
    }else{
      return (distance / 50).toString()
    }
};

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(checkShippingMethod(shippingMethod, distance));
});


//Exercise 5
const checkShippingCost = (weight, distance) => {
      return (weight * distance * 0.1).toString()
};

app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(checkShippingCost(weight, distance));
});


//Exercise 6
const checkloyaltyPoint = (purchaseAmount) => {
      return (purchaseAmount * loyaltyRate).toString()
};

app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(checkloyaltyPoint(purchaseAmount));
});


let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
