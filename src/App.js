
import './App.css';
import ProfitLoss from './components/profit-loss/profit-loss';
import DataContextProvider from './context/DataContext';
import ColorContextProvider from './context/ColorContext';

function App() {
  return (
    <DataContextProvider>
      <ColorContextProvider>
         <ProfitLoss/>
      </ColorContextProvider>
    </DataContextProvider>
    
  
  );
}

export default App;
