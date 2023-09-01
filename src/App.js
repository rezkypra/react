import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Home from './component/page/home';
import League from './component/page/league';
import { decrement, increment } from './features/counter/counterSlice';



function App() {
  const value = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  

}


export default App;
