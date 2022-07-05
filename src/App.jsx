import "./App.css";
import Main from "./containers/Main/Main";
import Sidebar from "./containers/Sidebar/Sidebar";

export default function App() {
	return (
		<div className="App">
			<Sidebar />
			<Main />
		</div>
	);
}
