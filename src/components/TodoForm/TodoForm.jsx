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
import "./TodoForm.css";

export default function TodoForm({
	handleSubmit,
	heading = false,
	text,
	setText,
	day,
	setDay,
	time,
	setTime,
	projects,
	showButtons = false,
	setShowModal = false,
}) {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<form onSubmit={handleSubmit} className="todo-form">
				<div className="text">
					{heading && <h3>{heading}</h3>}
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="To do ..."
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
						<p>Choose a day</p>
					</div>
					<DatePicker value={day} onChange={(day) => setDay(day)} />
				</div>
				<div className="pick-time">
					<div className="title">
						<AccessTimeOutlinedIcon />
						<p>Choose time</p>
					</div>
					<TimePicker value={time} onChange={(time) => setTime(time)} />
				</div>
				<div className="pick-project">
					<div className="title">
						<PaletteOutlinedIcon />
						<p>Choose a project</p>
					</div>
					<div className="projects">
						{projects.map((project) => (
							<div className="project" key={project.id}>
								{project.name}
							</div>
						))}
					</div>
				</div>
				{showButtons && (
					<div>
						<div className="cancel" onClick={() => setShowModal(false)}>
							<CloseOutlinedIcon size="40" />
						</div>
						<div className="confirm">
							<button>+ Add to do</button>
						</div>
					</div>
				)}
			</form>
		</MuiPickersUtilsProvider>
	);
}
