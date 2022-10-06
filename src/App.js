import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [coinList, setCoinList] = useState([]);
  const [tokens, setTokens] = useState([]);
  console.log(coinList);
  console.log(tokens);

  useEffect(() => {
    const getCoins = async () => {
      let page = 1;
      let data = [];

      while (page <= 3) {
        const coinData = await fetch(`api/getCoins/?page=${page}`);
        const coinJson = await coinData.json();
        const fullData = coinJson.data;
        fullData.forEach((element) => data.push(element));
        page++;
      }

      setCoinList(data);
    };

    const getTokens = async () => {
      const tokenData = await fetch("api/getSheet");
      const tokenDataJson = await tokenData.json();
      setTokens(tokenDataJson);
    };
    getTokens();
    getCoins();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
