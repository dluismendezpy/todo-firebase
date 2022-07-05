import Project from "../../components/Project/Project";
import AddNewProject from "../../components/AddNewProject/AddNewProject";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import "./Projects.css";

export default function Projects() {
	const [showMenu, setShowMenu] = useState(true);
	const [edit, setEdit] = useState(false);
	const pencilColor = edit ? "#1EC94C" : "#000000";

	const projects = [
		{ id: 1, name: "personal", numOfTodos: 0 },
		{ id: 2, name: "work", numOfTodos: 1 },
		{ id: 3, name: "other", numOfTodos: 2 },
	];

	return (
		<div className="projects">
			<div className="header">
				<div className="title">
					<PaletteOutlinedIcon size="18" />
					<p>Projects</p>
				</div>
				<div className="btns">
					{showMenu && projects.length > 0 && (
						<span className="edit" onClick={() => setEdit((edit) => !edit)}>
							<EditOutlinedIcon size="15" color={pencilColor} />
						</span>
					)}
					<AddNewProject />
					<span className="arrow">
						<KeyboardArrowUpOutlinedIcon size="20" />
					</span>
				</div>
			</div>
			<div className="items">
				{projects.map((project) => (
					<Project project={project} key={project.id} edit={edit} />
				))}
			</div>
		</div>
	);
}
