import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log(store);
  return <div className="App">redux-saga tutorial</div>;
}

export default App;
