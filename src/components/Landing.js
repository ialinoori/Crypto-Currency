import React,{useState,useEffect} from 'react';

import spinner from "../gif/spinner.gif";

//API
import { getCoin } from '../services/api';

//Components
import Coin from './Coin';

//Style
import styles from "./Landing.module.css"

const Landing = () => {

    const [coins , setCoins] = useState([]);
    const [search , setSearch]= useState("");

    useEffect(()=>{
        const fetchAPI = async () => {
            const data = await getCoin()
            setCoins(data)
           
        }

        fetchAPI()

    },[])

    const searchHandler = event => {
        setSearch(event.target.value)
    };

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))


    return (
        <>
           <h1 className={styles.title}>Crypto Currency</h1>
           <input className={styles.input} type="text" placeholder="Search" value={search} onChange={searchHandler} />

           
            {
                coins.length ?
                    <div className={styles.coinContainer}>
                        {
                            searchedCoins.map(coin => <Coin
                                key={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                price={coin.current_price}
                                marketCap={coin.market_cap}
                                priceChange={coin.price_change_percentage_24h}
                            />)
                        }
                    </div> :

                    <img src={spinner}/>
            }
    
            
        </>
    );
};

export default Landing;