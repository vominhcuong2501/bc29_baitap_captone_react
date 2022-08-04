import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

function App() {
  // render nội dung đặt tron router
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
