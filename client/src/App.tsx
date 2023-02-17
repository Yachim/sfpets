// import "./scss/App.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Page, Root } from "./components";
import { Pets } from "./components/pages/Pets";
import "./scss/App.scss";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Root />} />
				<Route
					path="/:lang"
					element={<Page />}
				/>
				<Route
					path="/:lang/:element"
					element={<Page />}
				/>
			</Routes>
		</HashRouter>
	);
}

export default App;
