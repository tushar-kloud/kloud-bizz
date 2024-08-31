import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import SessionPage from "./pages/SessionPage";
import PricingScreen from "./pages/PricingScreen";
import HighlightsScreen from "./pages/HighlightsScreen";
import NewsScreen from "./pages/NewsScreen";
import NotFound from "./pages/404";
import BusinessLab from "./pages/BusinessLab";
import HomePage from "./pages/HomePage";
import Copyright from "./components/Copyright";
import LearningPathScreen from "./pages/LearningPathScreen";
import CourseDetailScreen from "./pages/CourseDetailScreen";
import MyLearningPathScreen from "./pages/MyLearningPathScreen";
import MyCourseScreen from "./pages/MyCourseScreen";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";

function Layout() {
  return (
    <div>
      <Navbar mode="light" />
      <Outlet />
      <Copyright />
    </div>
  );
}

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/pricing" element={<PricingScreen />} />
      <Route path="/highlights" element={<HighlightsScreen />} />
      <Route path="/news" element={<NewsScreen />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/business-lab" element={<BusinessLab />} />
      <Route path="/learning-path/:learningId" element={<LearningPathScreen />} />
      <Route path="/my-learning-path/:learningId" element={<MyLearningPathScreen />} />
      <Route path="/course/:courseId" element={<CourseDetailScreen />} />
      <Route path="/my-course/:courseId" element={<MyCourseScreen />} />
      <Route path="/session/:id" element={<SessionPage tile />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
