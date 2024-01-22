import CoinSearch from "../components/CoinSearch";
import Trending from "../components/Trending";
import CoinPage from "../components/CoinPage";

function Home({coins}) {
    return (
      <>
        <CoinSearch coins={coins} />
    
        <Trending />
      </>
    );
}

export default Home;