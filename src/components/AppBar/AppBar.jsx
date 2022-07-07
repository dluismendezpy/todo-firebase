import logo from "../../assets/images/User/logo.svg";
import "./AppBar.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function AppBar() {
	return (
		<div className="app-bar">
			<div className="logo">
				<img src={logo} alt="Todapp" />
			</div>
			<div className="info">
				<p>Todapp</p>
				<a
					href="https://www.luismendezdev.com/"
					target="_blank"
					rel="noreferrer"
				>
					Developer website
					<span>
						<OpenInNewIcon className="launch" />
					</span>
				</a>
			</div>
		</div>
	);
}
