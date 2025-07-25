import express from "express";
import {
	addProduct,
	listProducts,
	removeProduct,
	singleProduct,
} from "../controllers/product.controller.js";
import upload from "../midlleware/multer.js";
import adminAuth from "../midlleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
	"/add",
	adminAuth,
	upload.fields([
		{ name: "image1", maxCount: 1 },
		{ name: "image2", maxCount: 1 },
		{ name: "image3", maxCount: 1 },
		{ name: "image4", maxCount: 1 },
	]),
	addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
