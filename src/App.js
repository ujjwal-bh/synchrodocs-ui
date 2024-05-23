import Home from './Components/Home';
import TextEditor from './Components/TextEditor';
import {BrowserRouter as Router, Routes, Route, } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>}>
          
        </Route>
        <Route path='/document/:id' element={<TextEditor/>}/>
      </Routes>
    </Router>
  );
}

export default App;
