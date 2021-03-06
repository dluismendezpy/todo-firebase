import {
	DatePicker,
	MuiPickersUtilsProvider,
	TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LibraryBooksSharpIcon from "@mui/icons-material/LibraryBooksSharp";
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
	todoProject,
	setTodoProject,
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
						placeholder="Todo..."
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
						<LibraryBooksSharpIcon />
						<p>Choose a list</p>
					</div>
					<div className="projects">
						{projects.length > 0 ? (
							projects.map((project) => (
								<div
									className={`project ${
										todoProject === project.name ? "active" : ""
									}`}
									key={project.id}
									onClick={() => setTodoProject(project.name)}
								>
									{project.name}
								</div>
							))
						) : (
							<div style={{ color: "#ff0000" }}>Add a project first</div>
						)}
					</div>
				</div>
				{showButtons && (
					<div>
						<div className="cancel" onClick={() => setShowModal(false)}>
							<CloseOutlinedIcon />
						</div>
						<div className="confirm">
							<button>+ Add Todo</button>
						</div>
					</div>
				)}
			</form>
		</MuiPickersUtilsProvider>
	);
}
