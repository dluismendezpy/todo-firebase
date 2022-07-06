import logo from "../../assets/images/User/logo.svg";
import "./User.css";

export default function User() {
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
					Go to developer website
				</a>
			</div>
		</div>
	);
}
