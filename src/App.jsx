import "./App.css";
import Main from "./containers/Main/Main";
import Sidebar from "./containers/Header/Sidebar";
import Projects from "./containers/Projects/Projects";
import Todos from "./containers/Todos/Todos";

export default function App() {
	return (
		<div className="App">
			<Sidebar />
			<Main />
			<Projects />
			<Todos />
		</div>
	);
}
