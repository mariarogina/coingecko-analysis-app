export const findLongestDownward = (data) => {
  const prices = data.map((item) => item[1]);
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
  return n_max;
};

export const findMaxVolume = (totalVol) => {
  const dates = totalVol.map((item) => item[0]);
  const volumes = totalVol.map((item) => item[1]);
  let maximumVolume = Math.max(...volumes);
  const maxVolumeIndex = volumes.indexOf(maximumVolume);
  let maximumVolumeDate = dates[maxVolumeIndex];

  return [maximumVolume, maximumVolumeDate];

  //   console.log("MAX VOLUME AND DATE", maxVolume, maxVolumeDate);
};

export const findMaxBenefit = (prices) => {
  let maxBenefit = 0;
  let buyIndex = -1;
  let sellIndex = -1;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i; j < prices.length; j++) {
      const benefit = prices[j] - prices[i];
      if (benefit > maxBenefit) {
        maxBenefit = benefit;
        buyIndex = i;
        sellIndex = j;
      }
    }
  }
  return [buyIndex, sellIndex];
};

export const findDatesPrices = (data) => {
  const dates = data.map((item) => item[0]);
  const prices = data.map((item) => item[1]);
  return [dates, prices];
};

export const findMaxPrice = (data) => {
  const dates = findDatesPrices(data)[0];
  const prices = findDatesPrices(data)[1];
  const maxIndex = findMaxBenefit(prices)[1];
  let maximumPriceDate = dates[maxIndex];
  return maximumPriceDate;
};

export const findMinPrice = (data) => {
  const dates = findDatesPrices(data)[0];
  const prices = findDatesPrices(data)[1];
  const minIndex = findMaxBenefit(prices)[0];
  let minimumPriceDate = dates[minIndex];
  return minimumPriceDate;
};
