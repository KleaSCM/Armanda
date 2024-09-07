
export const fetchStockData = async (symbol: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/stocks/${symbol}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
