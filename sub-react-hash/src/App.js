import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Kapa from './Kapa';
import Ge from './Ge';

function App() {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
      <Link to="/">首页</Link>
      <Link to="/kapa">kapa</Link>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Ge></Ge>} ></Route>
          <Route path="/kapa" element={<Kapa></Kapa>} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
