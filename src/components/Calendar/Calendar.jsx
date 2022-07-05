import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CALENDAR_ITEMS } from "../../globalValues";
import "./Calendar.css";

export default function Calendar() {
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
					<div className="item" key={item}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}
