import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import Oauth from "./pages/Oauth";
import BeatLoader from "react-spinners/FadeLoader";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  if (localStorage.getItem("loginStatus") === null) {
    localStorage.setItem("loginStatus", "false");
  }

  const Main = lazy(() => import("./pages/Main"));
  const Place = lazy(() => import("./pages/Place"));
  const Post = lazy(() => import("./pages/Post"));
  const MyPage = lazy(() => import("./pages/MyPage"));
  const WritePost = lazy(() => import("./pages/WritePost"));
  const PlaceDetail = lazy(() => import("./pages/PlaceDetail"));
  const DetailPost = lazy(() => import("./pages/DetailPost"));
  const Map = lazy(() => import("./pages/Map"));
  const LoginSign = lazy(() => import("./pages/LoginSign"));
  const EditPost = lazy(() => import("./pages/EditPost "));
  const NoAddress = lazy(() => import("./pages/NoAddress"));
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <ScrollToTop />
          <Suspense fallback={<BeatLoader color="var(--black-500)" />}>
            <Routes>
              <Route path="/login" element={<LoginSign />}></Route>
              <Route path="/" element={<Main />} />
              <Route path="/attractions" element={<Place />}>
                <Route path="search" element={<Place />} />
              </Route>
              <Route path="/posts" element={<Post />} />
              <Route path="/write/:id" element={<WritePost />} />
              <Route path="/map" element={<Map />} />
              <Route path="/attractions/detail/:id" element={<PlaceDetail />} />
              <Route path="/posts/detail/:id" element={<DetailPost />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/oauth" element={<Oauth />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="*" element={<NoAddress />} />
            </Routes>
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
