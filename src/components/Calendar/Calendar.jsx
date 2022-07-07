import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CALENDAR_ITEMS } from "../../globalValues";
import "./Calendar.css";
import { TodoContext } from "../../helpers/TodoContext";
import { useContext, useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Calendar() {
	// context
	const { setSelectedProject } = useContext(TodoContext);

	// state
	const [showMenu, setShowMenu] = useState(true);

	// spring animations
	const spin = useSpring({
		transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
		config: { friction: 10 },
	});

	const menuAnimation = useSpring({
		display: showMenu ? "block" : "none",
		lineHeight: showMenu ? 1.2 : 0,
	});

	return (
		<div className="calendar">
			<div className="header">
				<div className="title">
					<CalendarMonthOutlinedIcon />
					<p>Calendar</p>
				</div>
				<animated.div
					style={spin}
					className="btns"
					onClick={() => setShowMenu(!showMenu)}
				>
					<span>
						<KeyboardArrowUpOutlinedIcon />
					</span>
				</animated.div>
			</div>
			<animated.div className="items" style={menuAnimation}>
				{CALENDAR_ITEMS.map((item) => (
					<div
						className="item"
						key={item}
						onClick={() => setSelectedProject(item)}
					>
						{item}
					</div>
				))}
			</animated.div>
		</div>
	);
}
