import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTE } from './constants'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
