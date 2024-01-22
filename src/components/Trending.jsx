import axios from "axios";
import { useState, useEffect } from "react";

function Trending() {
  const [trending, setTrending] = useState([]);

  const url = "https://api.coingecko.com/api/v3/search/trending";

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((response) => {
        setTrending(response.data.coins);
      });
  }, []);

  return (
    <div className="rounded-div my-12 py-8 text-primary">
      <h1 className="text-2xl font-bold py-4">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.map((coin) => (
          <div
            key={coin.id}
            className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300"
          >
            <div className="flex w-full items-center">
              <div className="flex">
                <img
                  className="mr-4 rounded-full"
                  src={coin.item.small}
                  alt="/"
                />
              </div>
              <div>
                <p className="font-bold">{coin.item.name}</p>
                <p>{coin.item.symbol}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="w-4 mr-2"
                src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                alt="/"
              />
              <p className="mr-6">{coin.item.price_btc.toFixed(7)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
