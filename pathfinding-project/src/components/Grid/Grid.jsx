import { usePathfindingContext } from "../../context/PathfindingContext";
import Node from "../Node/Node";
import "./Grid.css";

const Grid = () => {
	const { grid, selectNode, handleMouseDown, handleMouseUp, handleMouseEnter } = usePathfindingContext();

	return (
		<div className="grid">
			{grid.map((row, rowIdx) => (
				<div key={rowIdx} className="grid-row">
					{row.map((node, nodeIdx) => (
						<Node
							key={nodeIdx}
							node={node}
							onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
							onMouseUp={() => handleMouseUp()}
							onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default Grid;
