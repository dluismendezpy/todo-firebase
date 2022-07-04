import "./App.css";
import Main from "./containers/Main/Main";
import Header from "./containers/Header/Header";
import Projects from "./containers/Projects/Projects";
import Todos from "./containers/Todos/Todos";

export default function App() {
	return (
		<div className="App">
			<Header />
			<Main />
			<Projects />
			<Todos />
		</div>
	);
}
