import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: Array,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	subCategory: {
		type: String,
		required: true,
	},
	sizes: {
		type: Array,
		required: true,
	},
	bestseller: {
		type: Boolean,
	},
	date: {
		type: Number,
		required: true,
	},
    offer: {
        type: Number,
        default: 10,
    },
    reviews: {
        type: Number,
        default: 12,
    },
    rating: {
        type: Number,
        default: 4.5,
    }
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
