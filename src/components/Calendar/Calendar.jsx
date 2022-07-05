import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CALENDAR_ITEMS } from "../../globalValues";
import "./Calendar.css";
import { TodoContext } from "../../helpers/TodoContext";
import { useContext } from "react";

export default function Calendar() {
	const { setSelectedProject } = useContext(TodoContext);

	return (
		<div className="calendar">
			<div className="header">
				<div className="title">
					<CalendarMonthOutlinedIcon size="18" />
					<p>Calendar</p>
				</div>
				<div className="btns">
					<span>
						<KeyboardArrowUpOutlinedIcon size="20" />
					</span>
				</div>
			</div>
			<div className="items">
				{CALENDAR_ITEMS.map((item) => (
					<div
						className="item"
						key={item}
						onClick={() => setSelectedProject(item)}
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}
