import { useState } from "react";
import Modal from "../Modal/Modal";
import "./AddNewTodo.css";
import {
	DatePicker,
	TimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function AddNewTodo() {
	const [showModal, setShowModal] = useState(false);
	const [text, setText] = useState("");
	const [day, setDay] = useState(new Date());
	const [time, setTime] = useState(new Date());

	return (
		<div className="add-new-todo">
			<div className="btn">
				<button onClick={() => setShowModal(true)}>+ New Todo</button>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<form>
						<div className="text">
							<h3>Add new to do!</h3>
							<input
								type="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="Enter a task"
								autoFocus
							/>
						</div>
						<div className="remind">
							<NotificationsOutlinedIcon />
							<p>Remind Me!</p>
						</div>
						<div className="pick-day">
							<div className="title">
								<CalendarMonthOutlinedIcon />
								<p>Day</p>
							</div>
							<DatePicker value={day} onChange={(day) => setDay(day)} />
						</div>
						<div className="pick-time">
							<div className="title">
								<AccessTimeOutlinedIcon />
								<p>Time</p>
							</div>
							<TimePicker value={time} onChange={(time) => setTime(time)} />
						</div>
						<div className="pick-project">
							<div className="title">
								<PaletteOutlinedIcon />
								<p>Project</p>
							</div>
							<div className="projects">
								<div className="project active">personal</div>
								<div className="project">work</div>
								<div className="project">work</div>
							</div>
						</div>
						<div className="cancel" onClick={() => setShowModal(false)}>
							<CloseOutlinedIcon size="40" />
						</div>
						<div className="confirm">
							<button>+ Add to do</button>
						</div>
					</form>
				</MuiPickersUtilsProvider>
			</Modal>
		</div>
	);
}
