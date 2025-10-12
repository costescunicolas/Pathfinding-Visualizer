const isEmpty = (array) => !Array.isArray(array) || array.length === 0;

const isValidPosition = (grid, row, col) =>
	  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const heuristic = (row1, col1, row2, col2) => Math.abs(row1 - row2) + Math.abs(col1 - col2);

const insertMinHeap = (heap, element) => {
	heap.push(element);
	let index = heap.length - 1;
	for (let flr = Math.floor((index - 1) / 2); index > 0 && heap[flr].heuristicValue > heap[index].heuristicValue; 
	flr = Math.floor((index - 1) / 2)) {
		[heap[index], heap[flr]] = [heap[flr], heap[index]];
		index = Math.floor((index - 1) / 2);
	}
}

export const bfsAlgorithm = (grid, startRow, startCol, endRow, endCol) => {
	const queue = [];

	queue.push(grid[startRow][startCol]);
	grid[startRow][startCol].isVisited = true;
  
	const visitedNodesInOrder = [];
	const parent = Array.from({length: grid.length}, () => 
		Array.from({length: grid[0].length}, () => null)
	);
  
	while (!isEmpty(queue)) {
	  const node = queue.shift();
	  visitedNodesInOrder.push(node);
  
	  const { row, col } = node;
  
	  if (row === endRow && col === endCol) break;
  
	  const dx = [0, -1, 0, 1];
	  const dy = [-1, 0, 1, 0];
  
	  for (let i = 0; i < dx.length; i++) {
		const newRow = row + dx[i];
		const newCol = col + dy[i];
  
		if (
		  isValidPosition(grid, newRow, newCol) &&
		  !grid[newRow][newCol].isVisited &&
		  !grid[newRow][newCol].isWall
		) {
		  parent[newRow][newCol] = {row, col};
		  grid[newRow][newCol].isVisited = true;
		  queue.push(grid[newRow][newCol]);
		}
	  }
	}
	
	const nodePath = [];
	let current = {row: endRow, col: endCol};
	while (current.row !== startRow || current.col !== startCol) {
		nodePath.push(grid[current.row][current.col]);
		current = parent[current.row][current.col];
	}
	nodePath.push(grid[startRow][startCol]);
	nodePath.reverse();
	

	return {visitedNodesInOrder, nodePath};
  };

  export const dfsAlgorithm = (grid, startRow, startCol, endRow, endCol) => {
	const stack = [];
	
  
	stack.push(grid[startRow][startCol]);
	grid[startRow][startCol].isVisited = true;
  
	const visitedNodesInOrder = [];
	const parent = Array.from({length: grid.length}, () => 
		Array.from({length: grid[0].length}, () => null)
	);
  
	while (!isEmpty(stack)) {
	  const node = stack.pop();
	  visitedNodesInOrder.push(node);
  
	  const { row, col } = node;
  
	  if (row === endRow && col === endCol) break;
  
	  const dx = [0, -1, 0, 1];
	  const dy = [-1, 0, 1, 0];
  
	  for (let i = 0; i < dx.length; i++) {
		const newRow = row + dx[i];
		const newCol = col + dy[i];
  
		if (
		  isValidPosition(grid, newRow, newCol) &&
		  !grid[newRow][newCol].isVisited &&
		  !grid[newRow][newCol].isWall
		) {
		  parent[newRow][newCol] = {row, col};
		  grid[newRow][newCol].isVisited = true;
		  stack.push(grid[newRow][newCol]);
		}
	  }
	}
	
	const nodePath = [];
	let current = {row: endRow, col: endCol};
	while (current.row !== startRow || current.col !== startCol) {
		nodePath.push(grid[current.row][current.col]);
		current = parent[current.row][current.col];
	}
	nodePath.push(grid[startRow][startCol]);
	nodePath.reverse();
	

	return {visitedNodesInOrder, nodePath};
  };

  export const aStarAlgorithm = (grid, startRow, startCol, endRow, endCol) => {

	const openSet = [];
	const visitedNodesInOrder = [];
	const parent = Array.from({length: grid.length}, () => 
		Array.from({length: grid[0].length}, () => null)
	);

	insertMinHeap(openSet, {node: grid[startRow][startCol], heuristicValue: 0});

	while (!isEmpty(openSet)) {
		const { node } = openSet.shift();
		visitedNodesInOrder.push(node);

		const {row, col} = node;

		if (row === endRow && col === endCol) break;

		const dx = [0, -1, 0, 1];
	  	const dy = [-1, 0, 1, 0];

		for (let i = 0; i < dx.length; i++) {
			const newRow = row + dx[i];
			const newCol = col + dy[i];

			if (
				isValidPosition(grid, newRow, newCol) &&
				!grid[newRow][newCol].isVisited &&
				!grid[newRow][newCol].isWall
			  ) {
				parent[newRow][newCol] = {row, col};
				grid[newRow][newCol].isVisited = true;
				const heuristicValue = heuristic(newRow, newCol, endRow, endCol);
				insertMinHeap(openSet, {node: grid[newRow][newCol], heuristicValue});
			  }

		}

	}

	const nodePath = [];
	let current = {row: endRow, col: endCol};
	while (current.row !== startRow || current.col !== startCol) {
		nodePath.push(grid[current.row][current.col]);
		current = parent[current.row][current.col];
	}
	nodePath.push(grid[startRow][startCol]);
	nodePath.reverse();
		

	return {visitedNodesInOrder, nodePath};


  }

  export const algorithmFactory = (algorithm, grid, startRow, startCol, endRow, endCol) => {
	switch (algorithm) {
		case "BFS":
			return bfsAlgorithm(grid, startRow, startCol, endRow, endCol);
		case "DFS":
			return dfsAlgorithm(grid, startRow, startCol, endRow, endCol);
		case "A-Star":
			return aStarAlgorithm(grid, startRow, startCol, endRow, endCol);
		default:
			return {visitedNodesInOrder: null, nodePath: null};
			
	}
  }