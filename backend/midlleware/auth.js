import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "Unauthorized access Login again" });
	}

	try {
		const token_decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if (!token_decoded) {
			return res.status(401).json({ success: false, message: "Invalid token" });
		}

		req.user = {
			_id: token_decoded._id || token_decoded.id,
			email: token_decoded.email,
			name: token_decoded.name,
		};

		if(!req.body) req.body = {};

		req.params.userId = token_decoded._id || token_decoded.id;
		req.body.userId = token_decoded._id || token_decoded.id;
		req.query.userId = token_decoded._id || token_decoded.id;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ success: false, message: error.message });
	}
};

export default authUser;
