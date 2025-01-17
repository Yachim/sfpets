// import "./scss/App.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Context, Page } from "./components";
import "./scss/App.scss";

export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Context>
				<HashRouter>
					<Routes>
						<Route
							path="/"
							element={<Page />}
						/>
						<Route
							path="/:element"
							element={<Page />}
						/>
					</Routes>
				</HashRouter>
			</Context>
		</QueryClientProvider>
	);
}

export default App;
