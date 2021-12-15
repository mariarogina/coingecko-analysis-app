import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalVolumes, setTotalVolumes] = useState([]);
  const [maxVolume, setMaxVolume] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [downwardSpan, setDownwardSpan] = useState("");
  const [maxPriceDate, setMaxPriceDate] = useState("");
  const [minPriceDate, setMinPriceDate] = useState("");
  const [maxVolumeDate, setMaxVolumeDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function fetchData() {
      try {
        const resp = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`
        );
        console.log(resp.data);

        setFinancialData(filterEntries(resp.data.prices));
        setTotalVolumes(filterEntries(resp.data.total_volumes));
        console.log("DATA", financialData);
        console.log("VOLUMES", totalVolumes);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    fetchData();
  };

  const filterEntries = (list) => {
    const uniqueDays = [];
    const uniqueEntries = [];
    console.log("LIST TO FILTER:", list);
    list.forEach(function (item, index) {
      const dateDate = new Date(item[0]).getDate();

      if (uniqueDays.indexOf(dateDate) < 0) {
        uniqueDays.push(dateDate);
        uniqueEntries.push(item);
      }
    });

    console.log("UNIQUE ENTRIES", uniqueEntries);
    return uniqueEntries;
  };

  const handleSubmitAndFilter = (e) => {
    handleSubmit(e);
  };
  const convertDate = (date) => {
    const stamp = parseInt((new Date(date).getTime() / 1000).toFixed(0));
    return stamp;
  };

  const convertToISO = (stampDate) => {
    const jsDate = new Date(stampDate).toLocaleDateString("ru-RU");
    return jsDate;
  };

  const handleSetStart = (e) => {
    setStartDate("");
    setStartDate(convertDate(e.target.value));
  };
  const handleSetEnd = (e) => {
    setEndDate("");
    const newEndDate = convertDate(e.target.value) + 3600;
    setEndDate(newEndDate);
  };

  //The maximum amount of days bitcoin’s price was decreasing (dayspan)
  const handleFindDownward = () => {
    findLongestDownward();
  };

  const findLongestDownward = () => {
    const prices = financialData.map((item) => item[1]);
    let n_max = 0;
    let n_current = 0;
    for (let i = 0; i < prices.length; i++) {
      while (prices[i] < prices[i + 1]) {
        n_current++;
        i++;
      }

      if (n_current > n_max) {
        n_max = n_current;
        n_current = 0;
      }
    }
    setDownwardSpan(n_max);
    console.log("DOWN", downwardSpan);
  };

  //The date with the highest trading volume and the volume (max total volume and corresponding date)
  const handleFindVolume = () => {
    findMaxVolume();
  };

  const findMaxVolume = () => {
    const dates = totalVolumes.map((item) => item[0]);
    const volumes = totalVolumes.map((item) => item[1]);
    let maximumVolume = Math.max(...volumes);
    const maxVolumeIndex = volumes.indexOf(maximumVolume);
    setMaxVolume(maxVolume);
    let maximumVolumeDate = dates[maxVolumeIndex];
    setMaxVolumeDate(maximumVolumeDate);
    console.log("MAX VOLUME AND DATE", maxVolume, maxVolumeDate);
  };

  

  const handleShouldBuyOrSell=()=>{
    if(ifOnlyDownward){
      alert("The price only decreases, deals are not profitable")
    } else {
      handleFindSell
    }
  }
    const ifOnlyDownward = () => {
  const prices = financialData.map((item) => item[1]);
  let n_current = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > prices[i + 1]) {
      n_current++;
      i++;
    }
  }
  if (n_current > 0) {
    return true;
  }
};
  }
  //A pair of days: The day to buy and the day to sell (max price sell, min price buy)
  const handleFindSell = () => {
    findMaxPrice();
    findMinPrice();
  };

  const findMaxPrice = () => {
    const dates = financialData.map((item) => item[0]);
    const prices = financialData.map((item) => item[1]);
    let maximumPrice = Math.max(...prices);
    const maxPriceIndex = prices.indexOf(maximumPrice);
    setMaxPrice(maximumPrice);
    let maximumPriceDate = dates[maxPriceIndex];
    setMaxPriceDate(maximumPriceDate);
    console.log("MAX SELL", maxPriceDate, maxPrice);
  };

  const handleFindBuy = () => {
    findMinPrice();
  };

  const findMinPrice = () => {
    let dates = financialData.map((item) => item[0]);
    const prices = financialData.map((item) => item[1]);
    let minimumPrice = Math.min(...prices);
    const minPriceIndex = prices.indexOf(minimumPrice);
    setMinPrice(minimumPrice);
    let minimumPriceDate = dates[minPriceIndex];
    setMinPriceDate(minimumPriceDate);
    console.log("MIN BUY", minPriceDate, minPrice);
  };

  //If the price only decreases in the date range, warn to not buy and not sell

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmitAndFilter(e)}>
        <input
          type="date"
          placeholder="From"
          onInput={(e) => handleSetStart(e)}
        />
        <input type="date" placeholder="To" onInput={(e) => handleSetEnd(e)} />
        <button type="submit"> Submit</button>
      </form>
      <p>{startDate}</p>

      <p>{endDate}</p>

      <p>{financialData?.length}</p>

      <div>
        {financialData?.map((item) => (
          <li key={item[0]}>
            <p>Date: {convertToISO(item[0])}</p>
            <p>Price: {item[1].toFixed(2)}</p>
          </li>
        ))}

        {totalVolumes?.map((item) => (
          <li key={item[0]}>
            <p>Date: {convertToISO(item[0])}</p>
            <p>Volume: {item[1].toFixed(2)}</p>
          </li>
        ))}
      </div>

      <button
        onClick={() => {
          handleFindDownward();
        }}
      >
        Longest downward{" "}
      </button>
      <button
        onClick={() => {
          handleFindSell();
        }}
      >
        When to sell
      </button>
      <button
        onClick={() => {
          handleFindBuy();
        }}
      >
        When to buy
      </button>
      <button
        onClick={() => {
          handleFindVolume();
        }}
      >
        Higest trading volume
      </button>
    </div>
  );
      }

export default App;
