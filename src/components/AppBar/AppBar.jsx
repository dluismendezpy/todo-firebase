import logo from "../../assets/images/User/logo.svg";
import "./AppBar.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function AppBar() {
	return (
		<div className="user">
			<div className="logo">
				<img src={logo} alt="logo" />
			</div>
			<div className="info">
				<p>Todapp</p>
				<a
					href="https://www.luismendezdev.com/"
					target="_blank"
					rel="noreferrer"
				>
					Developer website{" "}
					<span>
						<OpenInNewIcon
							style={{ marginLeft: "1.5px", width: "13px", height: "13px" }}
						/>
					</span>
				</a>
			</div>
		</div>
	);
}
