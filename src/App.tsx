import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicPage } from "./BasicPage";
import { DesignSystemPage } from "./DesignSystemPage";
import { QuillPage } from "./QuillPage";
import { NextPage } from "./NestPage";

function App() {
  return (
    <>
      <h1>フォーム例</h1>
      <div className="nav-wrapper">
        <a href="/basic">基本</a>
        <a href="/designsystem">デザインシステム</a>
        <a href="/quill">Quill</a>
        <a href="/nest">ネスト</a>
      </div>
      <hr />

      <BrowserRouter>
        <Routes>
          <Route path="/basic" element={<BasicPage />} />
          <Route path="/designsystem" element={<DesignSystemPage />} />
          <Route path="/quill" element={<QuillPage />} />
          <Route path="/nest" element={<NextPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
