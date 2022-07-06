import linkedin from "../../assets/images/Footer/linkedin.svg";
import github from "../../assets/images/Footer/github.svg";
import mail from "../../assets/images/Footer/mail.svg";
import "./Footer.css";

const iconsData = [
	{
		img: linkedin,
		alt: "Linkedin",
		href: "https://www.linkedin.com/in/luismendez-dev/",
	},
	{ img: github, alt: "Github", href: "https://github.com/dluismendezpy" },
	{ img: mail, alt: "mail", href: "mailto:info@luismendezdev.com" },
];

export default function Footer() {
	return (
		<div className="footer-container">
			<p className="title">LuisMendezDev</p>
			<p className="sub-title">&copy; 2022. All rights reserved.</p>
			<div className="icons">
				{iconsData.map(({ img, alt, href }, index) => (
					<a href={href} key={index} target="_blank" rel="noreferrer">
						<img className="img-icon" src={img} />
					</a>
				))}
			</div>
		</div>
	);
}
