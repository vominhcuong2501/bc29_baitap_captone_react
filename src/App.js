import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./contexts/loading.context";
import Router from "./routes";

function App() {
  // render nội dung đặt tron router
  return (
    <BrowserRouter>
      {/* lazyLoading: cách ngăn web load những phần chưa dùng dến 
    1. thêm component suspense ở app.js 
    2. thêm lazy cho trang router*/}
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
