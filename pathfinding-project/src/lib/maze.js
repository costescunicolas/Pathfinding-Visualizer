const isValidPosition = (grid, visited, row, col) => {
	return row >= 0 &&
	       row < grid.length &&
	       col >= 0 &&
	       col < grid[0].length &&
	       !visited[row][col];
}

export const dfsMaze = (grid, startRow = 1, startCol = 1) => {
	const stack = [];
	const visited = Array.from({ length: grid.length }, () =>
		Array.from({ length: grid[0].length }, () => false)
	);

	// Ensure starting point is an odd cell
	startRow = startRow % 2 === 0 ? startRow + 1 : startRow;
	startCol = startCol % 2 === 0 ? startCol + 1 : startCol;

	stack.push({ row: startRow, col: startCol });
	visited[startRow][startCol] = true;
	grid[startRow][startCol].isWall = false;

	while (stack.length > 0) {
		const current = stack.pop();
		const { row, col } = current;

		// Shuffle directions to make maze random
		const directions = [
			[-2, 0],
			[2, 0],
			[0, -2],
			[0, 2]
		];
		for (let i = directions.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[directions[i], directions[j]] = [directions[j], directions[i]];
		}

		for (const [dr, dc] of directions) {
			const newRow = row + dr;
			const newCol = col + dc;

			if (isValidPosition(grid, visited, newRow, newCol)) {
				// Remove wall between current and new cell
				const wallRow = Math.floor(row + dr / 2);
				const wallCol = Math.floor(col + dc / 2);
				grid[wallRow][wallCol].isWall = false;

				grid[newRow][newCol].isWall = false;
				visited[newRow][newCol] = true;

				stack.push({ row: newRow, col: newCol });
			}
		}
	}

	return grid;
}
