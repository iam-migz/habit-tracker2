import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedPage from './pages/ProtectedPage';
// import Habit from './pages/Habit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage isLoggedIn={true}>
              <Home />
            </ProtectedPage>
          }
        />

        {/* <Route
          path="/habit/:id"
          element={
            <ProtectedPage isLoggedIn={userToken != null}>
              <Habit />
            </ProtectedPage>
          }
        />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
