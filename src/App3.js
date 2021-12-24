import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalVolumes, setTotalVolumes] = useState([]);
  const [maxVolume, setMaxVolume] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [downwardSpan, setDownwardSpan] = useState("");
  const [maxPriceDate, setMaxPriceDate] = useState("");
  const [minPriceDate, setMinPriceDate] = useState("");
  const [maxVolumeDate, setMaxVolumeDate] = useState("");
  const [canTrade, setCanTrade] = useState(true);
  const [showTrade, setShowTrade] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showDown, setShowDown] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [loadMessage, setLoadMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function fetchData() {
      try {
        const resp = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${
            startDate + 3600
          }&to=${endDate}`
        );
        console.log(resp.data);
        setMessage("");
        setLoadMessage("");
        setFinancialData(filterEntries(resp.data.prices));
        setTotalVolumes(filterEntries(resp.data.total_volumes));
        console.log("DATA", financialData);
        console.log("VOLUMES", totalVolumes);
        setDataLoaded(true);
        setLoadMessage("The data has NOT loaded, try to enter some dates");
      } catch (err) {
        // Handle Error Here
        console.error(err);
        setMessage("Data not loaded, try entering some dates");
      }
    }
    fetchData();
  };

  const filterEntries = (list) => {
    const uniqueDays = [];
    const uniqueEntries = [];
    console.log("LIST TO FILTER:", list);
    list.forEach(function (item, index) {
      const dateDate = new Date(item[0]).toDateString();

      if (uniqueDays.indexOf(dateDate) < 0) {
        uniqueDays.push(dateDate);
        uniqueEntries.push(item);
      }
    });

    console.log("UNIQUE ENTRIES", uniqueEntries);
    return uniqueEntries;
  };

  const handleSubmitAndFilter = (e) => {
    setMessage("");
    setMaxVolume(0);
    setShowTrade(false);
    setDownwardSpan("");
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
    const newEndDate = convertDate(e.target.value);
    setEndDate(newEndDate);
  };

  //The maximum amount of days bitcoin’s price was decreasing (dayspan)
  const handleFindDownward = () => {
    setShowDown(true);
    setShowVolume(false);
    setShowTrade(false);
    setMessage("");
    setMaxVolume(0);
    if (dataLoaded) {
      findLongestDownward();
    } else {
      setMessage("Please enter some dates first for showing the trend");
    }
  };

  const findLongestDownward = () => {
    const prices = financialData.map((item) => item[1]);
    let n_max = 0;
    let n_current = 0;
    for (let i = 0; i < prices.length; i++) {
      while (prices[i] > prices[i + 1]) {
        ++n_current;
        i++;
      }

      if (n_current > n_max) {
        n_max = n_current;
      }
      n_current = 0;
    }
    setDownwardSpan(n_max);
    console.log("DOWN", downwardSpan);
  };

  //The date with the highest trading volume and the volume (max total volume and corresponding date)
  const handleFindVolume = () => {
    setMessage("");
    setShowDown(false);
    setShowTrade(false);
    setShowVolume(true);
    if (dataLoaded) {
      setDownwardSpan("");
      findMaxVolume();
      console.log(maxVolumeDate);
      console.log(convertToISO(maxVolumeDate));
    } else {
      setMessage("Please enter some dates first for showing volume");
    }
  };

  const findMaxVolume = () => {
    const dates = totalVolumes.map((item) => item[0]);
    const volumes = totalVolumes.map((item) => item[1]);
    let maximumVolume = Math.max(...volumes);
    const maxVolumeIndex = volumes.indexOf(maximumVolume);
    setMaxVolume(maximumVolume);
    let maximumVolumeDate = dates[maxVolumeIndex];
    setMaxVolumeDate(maximumVolumeDate);
    console.log("MAX VOLUME AND DATE", maxVolume, maxVolumeDate);
  };

  const handleShouldBuyOrSell = () => {
    setMessage("");
    setShowTrade(true);
    setShowDown(false);
    setShowVolume(false);
    const impossible = ifOnlyDownward();
    if (dataLoaded) {
      if (impossible) {
        setCanTrade(false);
      } else {
        setCanTrade(true);
        handleFindSell();
      }
    } else {
      setMessage(
        "Please enter some dates first for showing buying and selling dates"
      );
    }
  };

  const ifOnlyDownward = () => {
    // setCanTrade(true);
    const prices = financialData.map((item) => item[1]);
    let n_current = 0;

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] < prices[i + 1]) {
        n_current++;
        i++;
      }
    }
    if (n_current === 0) {
      // setCanTrade(false);
      return true;
    } else if (n_current > 0) {
      return false;
    }
  };

  //A pair of days: The day to buy and the day to sell (max price sell, min price buy)
  const handleFindSell = () => {
    setMaxVolume(0);
    setShowDown(false);
    setShowVolume(false);
    setDownwardSpan("");
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
      <div className="appParagraph">
        <p className="appTitle">Set the date range</p>
        <form onSubmit={(e) => handleSubmitAndFilter(e)}>
          <input
            className="formItem inputElement"
            type="date"
            placeholder="From"
            onInput={(e) => handleSetStart(e)}
          />
          <input
            className="formItem inputElement"
            type="date"
            placeholder="To"
            onInput={(e) => handleSetEnd(e)}
          />
          <button className="formItem submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="appParagraph">
        {dataLoaded && financialData.length > 0 ? (
          <p style={{ color: "green", fontWeight: "700" }}>
            {" "}
            The data has loaded, choose what you want to know
          </p>
        ) : (
          <p> {loadMessage}</p>
        )}
        <button
          className="infoButton"
          onClick={() => {
            handleFindDownward();
          }}
        >
          Longest downward{" "}
        </button>
        <button
          className="infoButton"
          onClick={() => {
            handleShouldBuyOrSell();
          }}
        >
          Sell or Buy
        </button>

        <button
          className="infoButton"
          onClick={() => {
            handleFindVolume();
          }}
        >
          Highest trading volume
        </button>
      </div>

      <div className="appParagraph">
        {showVolume &&
          (maxVolume > 0 ? (
            <div>
              <p>
                Max volume: {maxVolume.toFixed(2)} euros on{" "}
                {convertToISO(maxVolumeDate)}
              </p>
            </div>
          ) : (
            <p>{message}</p>
          ))}

        {showTrade &&
          (maxPrice ? (
            canTrade ? (
              <div>
                {minPrice && <p>Should buy: on {convertToISO(minPriceDate)}</p>}
                {maxPrice && (
                  <p>Should sell: on {convertToISO(maxPriceDate)}</p>
                )}
              </div>
            ) : (
              <p>Deals are not profitable: the price only decreases</p>
            )
          ) : (
            <p>{message}</p>
          ))}
        {showDown &&
          (downwardSpan ? (
            <div>
              <p>Longest downward span: {downwardSpan} days in a row</p>
            </div>
          ) : (
            <p>{message}</p>
          ))}
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
