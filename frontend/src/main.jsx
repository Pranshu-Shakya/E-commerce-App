import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ShopContextProvider>
			<App />
		</ShopContextProvider>
	</BrowserRouter>,
);
