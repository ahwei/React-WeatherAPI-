import { Grid, Container } from "@mui/material";
import HistoryList from "./components/history/historyList";
import Search from "./components/search/search";
import Result from "./components/result/result";

function App() {
  return (
    <Container>
      <Search />
      <Result />
      <HistoryList />
    </Container>
  );
}

export default App;
