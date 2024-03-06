import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import Home from './components/Home';
import Join from "./components/Join";
import Host from "./components/Host";
import {SocketProvider}  from "./context/SocketContext";
import Nav from "./components/Nav"
function App() {
  return (
      
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <SocketProvider>
        <Routes>
            <Route path="/host" element={<Host/>}/>
            <Route path="/join" element={<Join/>}/>
          
        </Routes>
        </SocketProvider>
      </BrowserRouter>

  );
}

export default App;
