import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import { PathfindingProvider } from "./context/PathfindingContext";

const App = () => {
  return (
    <PathfindingProvider>
      <Header />
      <Grid />
    </PathfindingProvider>
    
  )
}

export default App;

