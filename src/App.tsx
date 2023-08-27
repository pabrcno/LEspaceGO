import { SnackbarProvider } from "notistack";
import { MainScreen } from "./pages/Main";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <SnackbarProvider maxSnack={1}>
        <MainScreen />
      </SnackbarProvider>
    </>
  );
}

export default App;
