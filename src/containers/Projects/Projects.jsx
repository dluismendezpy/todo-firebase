import Project from "../../components/Project/Project";
import AddNewProject from "../../components/AddNewProject/AddNewProject";
import LibraryBooksSharpIcon from "@mui/icons-material/LibraryBooksSharp";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext, useState } from "react";
import "./Projects.css";
import { TodoContext } from "../../helpers/TodoContext";
import { useSpring, animated } from "react-spring";

export default function Projects() {
	// context
	const { projects } = useContext(TodoContext);

	// state
	const [showMenu, setShowMenu] = useState(true);
	const [edit, setEdit] = useState(false);
	const pencilColor = edit ? "#1EC94C" : "#000000";

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
		<div className="projects">
			<div className="header">
				<div className="title">
					<LibraryBooksSharpIcon />
					<p>Lists</p>
				</div>
				<div className="btns">
					{showMenu && projects.length > 0 && (
						<span className="edit" onClick={() => setEdit((edit) => !edit)}>
							<EditOutlinedIcon style={{ color: pencilColor }} />
						</span>
					)}
					<AddNewProject />
					<animated.span
						className="arrow"
						onClick={() => setShowMenu(!showMenu)}
						style={spin}
					>
						<KeyboardArrowUpOutlinedIcon />
					</animated.span>
				</div>
			</div>
			<animated.div className="items" style={menuAnimation}>
				{projects.map((project) => (
					<Project project={project} key={project.id} edit={edit} />
				))}
			</animated.div>
		</div>
	);
}
