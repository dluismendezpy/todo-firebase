import React, { createContext, useState } from "react";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
	const defaultProject = "today";
	const [selectedProject, setSelectedProject] = useState(defaultProject);

	return (
		<TodoContext.Provider
			value={{
				selectedProject: selectedProject,
				setSelectedProject: setSelectedProject,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export { TodoContextProvider, TodoContext };
