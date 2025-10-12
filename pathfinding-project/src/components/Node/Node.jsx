import "./Node.css";

const Node = ({ node, onMouseEnter, onMouseUp, onMouseDown }) => {
	const { isStart, isEnd, isWall, isVisited, isPath } = node;

	let extraClass = "";
	if (isStart) extraClass = "node-start";

	else if (isEnd) extraClass = "node-end";
	else {
		if (isWall) extraClass = "node-wall";
		if (isVisited) extraClass = "node-visited";
		if (isPath) extraClass = "node-path";
	}
	

	return <div 
	className={`node ${extraClass}`} 
	onMouseDown={onMouseDown}
	onMouseEnter={onMouseEnter}
	onMouseUp={onMouseUp}
	></div>;
};

export default Node;
