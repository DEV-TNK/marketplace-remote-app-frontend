const LevelIcon = ({ level }) => {
	if (level === 'beginner') {
		return (
			<svg
				className="me-1 mt-n1"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="3" y="8" width="2" height="6" rx="1" fill="#754FFE" />
				<rect x="7" y="5" width="2" height="9" rx="1" fill="#DBD8E9" />
				<rect x="11" y="2" width="2" height="12" rx="1" fill="#DBD8E9" />
			</svg>
		);
	}
	if (level === 'intermediate') {
		return (
			<svg
				className="me-1 mt-n1"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="3" y="8" width="2" height="6" rx="1" fill="#754FFE" />
				<rect x="7" y="5" width="2" height="9" rx="1" fill="#754FFE" />
				<rect x="11" y="2" width="2" height="12" rx="1" fill="#DBD8E9" />
			</svg>
		);
	}
	if (level === 'advanced') {
		return (
			<svg
				className="me-1 mt-n1"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="3" y="8" width="2" height="6" rx="1" fill="#754FFE" />
				<rect x="7" y="5" width="2" height="9" rx="1" fill="#754FFE" />
				<rect x="11" y="2" width="2" height="12" rx="1" fill="#754FFE" />
			</svg>
		);
	}
	return '';
};

export default LevelIcon;
