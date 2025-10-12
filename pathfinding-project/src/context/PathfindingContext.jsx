import { createContext } from "react";
import { useState, useContext } from "react";
import { algorithmFactory, bfsAlgorithm } from "../algorithms";

export const PathfindingContext = createContext();

export const usePathfindingContext = () => useContext(PathfindingContext);


const NUM_ROWS = 40;
const NUM_COLS = 50;

const createInitialGrid = () => {
	return Array.from({ length: NUM_ROWS }, (_, row) =>
		Array.from({ length: NUM_COLS }, (_, col) => ({
			row,
			col,
			isStart: false,
			isEnd: false,
			isWall: false,
			isVisited: false,
			isPath: false,
		}))
	);
};


export const PathfindingProvider = ({children}) => {
	const [grid, setGrid] = useState(createInitialGrid());
	const [algorithm, setAlgorithm] = useState('');
	const [isMousePressed, setIsMousePressed] = useState(false);
	const [algorithmStarted, isAlgorithmStarted] = useState(false);

	const handleMouseDown = (row, col) => {
		if (algorithmStarted) return;
		selectNode(row, col)
		setIsMousePressed(true);
	}

	const handleMouseEnter = (row, col) => {
		if (!isMousePressed) return;
		selectNode(row, col);
	}

	const handleMouseUp = () => {
		setIsMousePressed(false);
	}

	const resetGrid = () => {
		if (algorithmStarted) return;
		setGrid(createInitialGrid);
	}

	const existStartNode = () => {
		for (const row of grid) {
			for (const node of row) {
				if (node.isStart) {
					return true;
				}
			}
		}
		return false;
	}

	const existEndNode = () => {
		for (const row of grid) {
			for (const node of row) {
				if (node.isEnd) {
					return true;
				}
			}
		}
		return false;	
	}

	const selectNode = (row, col) => {
		const newGrid = grid.map(r => r.slice());
		if (!existStartNode()) {
			newGrid[row][col].isStart = true;
		} else if (!existEndNode()) {
			newGrid[row][col].isEnd = true;
		} else {
			newGrid[row][col].isWall = true;
		}
		setGrid(newGrid);
	}

	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


	const startAlgorithm = async () => {
		const startNode = grid.flat().find(node => node.isStart);
		const endNode = grid.flat().find(node => node.isEnd);

		if (!startNode || !endNode) return;


		const {visitedNodesInOrder, nodePath} = algorithmFactory(
			algorithm,
			grid.map(row => row.map(n => ({...n}))),
			startNode.row,
			startNode.col,
			endNode.row,
			endNode.col
		);

		if (visitedNodesInOrder == null && nodePath == null) {
			isAlgorithmStarted(false);
			return;
		}

		isAlgorithmStarted(true);

		console.log(nodePath);
		console.log(visitedNodesInOrder);
		console.log(algorithm);
		

		for (const node of visitedNodesInOrder) {
			setGrid(prevGrid => {
				return prevGrid.map(row => 
					row.map(n => n.row === node.row && n.col === node.col ? {...n, isVisited: true} : n)
				)
			})
			await sleep(30);
		}

		for (const node of nodePath) {
			setGrid(prevGrid => {
				return prevGrid.map(row => 
					row.map(n => n.row === node.row && n.col === node.col ? {...n, isPath: true} : n)
				)
			})
			await sleep(5);
		}

		isAlgorithmStarted(false);

	}




	const value = {
		grid,
		setGrid,
		algorithm,
		setAlgorithm,
		resetGrid,
		selectNode,
		startAlgorithm,
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp
	}

	return (
		<PathfindingContext.Provider value={value}>
			{children}
		</PathfindingContext.Provider>
	)
}