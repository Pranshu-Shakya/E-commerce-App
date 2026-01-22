import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

// Generate rewiews and rating
const generateReviewsAndRating = () => {
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const reviews = Math.floor(Math.random() * 500) + 50;
    return { rating: Number(rating), reviews };
}

// Gerate random discount between 10-30%
const generateDiscount = () => {
    return Math.floor(Math.random() * 21) + 10;
}

// add product
const addProduct = async (req, res) => {
	try {

		const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        const { rating, reviews } = generateReviewsAndRating();

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false, //bestseller === "true" 
            image: imagesUrl,
            date: Date.now(),
            offer: generateDiscount(),
            rating,
            reviews,
        }

        console.log("Product Data:", productData);

        const product = new Product(productData);
        await product.save();
        
        res.status(200).json({
            success: true,
            message: "Product added successfully",
        });
        

	} catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log("Error in addProduct controller:", error);        
    }
};

// list products
const listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error in listProducts controller:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// remove product
const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message: "Product removed successfully",
        });
        console.log("Product removed successfully");
    } catch (error) {
        console.error("Error in removeProduct controller:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
};

// single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error("Error in singleProduct controller:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
