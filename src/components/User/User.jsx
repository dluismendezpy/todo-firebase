import logo from "../../assets/images/User/logo.svg";
import "./User.css";

export default function User() {
	return (
		<div className="user">
			<div className="logo">
				<img src={logo} alt="logo" />
			</div>
			<div className="info">
				<p>Todo app</p>
				<a href="#">Logout!</a>
			</div>
		</div>
	);
}
