import "./ProjectForm.css";

export default function ProjectForm({
	handleSubmit,
	heading,
	value,
	setValue,
	setShowModal,
	confirmButtonText,
}) {
	return (
		<form onSubmit={handleSubmit} className="project-form">
			<h3>{heading}</h3>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type="text"
				placeholder="Name..."
				autoFocus
			/>
			<button
				className="cancel"
				role="button"
				onClick={() => setShowModal(false)}
			>
				Cancel
			</button>
			<button className="confirm">{confirmButtonText}</button>
		</form>
	);
}
