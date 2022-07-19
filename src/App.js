import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import PokemonContainer from "./components/PokemonContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./components/PokemonCard";
import PokemonProvider from "./context/PokemonProvider";

function App() {
	return (
		<PokemonProvider>
			<div className="App">
				<Navbar />
				<Routes>
					<Route exact path="/" element={<PokemonContainer />} />
					<Route exact path="/p/:id" element={<PokemonCard />} />
				</Routes>
			</div>
		</PokemonProvider>
	);
}

export default App;
