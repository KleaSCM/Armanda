package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

const apiURL = "https://www.alphavantage.co/query"

type StockData struct {
	MetaData   map[string]interface{}       `json:"Meta Data"`
	TimeSeries map[string]map[string]string `json:"Time Series (1min)"`
}

func fetchStock(symbol string, apiKey string) (StockData, error) {
	var data StockData
	query := fmt.Sprintf("%s?function=TIME_SERIES_INTRADAY&symbol=%s&interval=1min&apikey=%s", apiURL, symbol, apiKey)

	response, err := http.Get(query)
	if err != nil {
		return data, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return data, err
	}

	err = json.Unmarshal(body, &data)
	if err != nil {
		return data, err
	}

	return data, nil
}
