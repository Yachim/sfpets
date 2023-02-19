// import "./scss/App.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Page, Root } from "./components";
import { Pets } from "./components/pages/Pets";
import "./scss/App.scss";

export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}

export default App;
