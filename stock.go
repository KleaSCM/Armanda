package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
)

const apiURL = "https://www.alphavantage.co/query"

// StockData represents the data structure returned by the Alpha Vantage API
type StockData struct {
	MetaData   map[string]interface{}       `json:"Meta Data"`
	TimeSeries map[string]map[string]string `json:"Time Series (1min)"`
	ErrorMsg   string                       `json:"Error Message,omitempty"`
}

// fetchStock fetches stock data from Alpha Vantage API
func fetchStock(symbol string, apiKey string) (StockData, error) {
	var data StockData
	query := fmt.Sprintf("%s?function=TIME_SERIES_INTRADAY&symbol=%s&interval=1min&apikey=%s", apiURL, symbol, apiKey)

	response, err := http.Get(query)
	if err != nil {
		return data, errors.New("unable to connect to the stock API")
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return data, errors.New("error reading API response")
	}

	err = json.Unmarshal(body, &data)
	if err != nil {
		return data, errors.New("failed to parse API response")
	}

	if data.ErrorMsg != "" {
		return data, errors.New(data.ErrorMsg)
	}

	return data, nil
}
