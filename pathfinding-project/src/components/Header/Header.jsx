// Header.jsx
import React from "react";
import "./Header.css";
import { usePathfindingContext } from "../../context/PathfindingContext";

const Header = () => {

	const {startAlgorithm, resetGrid, setAlgorithm} = usePathfindingContext();
  return (
    <header className="header">
      <h1 className="header-title">Pathfinding Visualizer</h1>

      <div className="header-controls">
        <label htmlFor="algorithm" className="header-label">
          Algorithm:
        </label>
        <select
          id="algorithm"
          name="algorithm"
          className="header-select"
          onChange={e => setAlgorithm(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
          <option value="A-Star">A-Star</option>
        </select>

        <button className="header-btn start" onClick={() => startAlgorithm()}>
          Start
        </button>
        <button className="header-btn reset" onClick={resetGrid}>
          Reset
        </button>
      </div>
    </header>
  );
};

export default Header;
