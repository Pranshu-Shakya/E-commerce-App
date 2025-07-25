import User from "../models/user.model.js";

// add products to user cart
const addToCart = async (req, res) => {
    try {
        
        const { userId, itemId, size} = req.body;
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1; // increment quantity
            } else {
                cartData[itemId][size] = 1; // add new size with quantity 1
            }
        } else {
            cartData[itemId] = {}; // create new item
            cartData[itemId][size] = 1; // add new item with size and quantity 1
        }

        await User.findByIdAndUpdate(userId, {cartData});
        return res.status(200).json({ success: true, message: "Item added to cart successfully" }); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity; // update quantity for the specific size
        await User.findByIdAndUpdate(userId, { cartData });
        return res.status(200).json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
        
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    try {

        const { userId } = req.body;
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;
        return res.status(200).json({ success: true, cartData });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
        
    }
}

export { addToCart, updateCart, getUserCart }