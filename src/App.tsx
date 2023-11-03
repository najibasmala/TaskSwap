import { CheckedProvider } from "./context";
import "./styles/main.scss";
import Content from "./components/Content";
function App() {
  //wrap with provider
  return (
    <CheckedProvider>
      <Content />
    </CheckedProvider>
  );
}

export default App;
