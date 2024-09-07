package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

const alphaVantageAPIKey = "PRCL1DXGJDGCPKZB"

var upgrader = websocket.Upgrader{}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/stocks/{symbol}", stockDataHandler)
	router.HandleFunc("/api/economic", economicHandler)
	router.HandleFunc("/api/orderbook", orderBookHandler)
	router.HandleFunc("/ws", handleWebSocket)

	// Use a handler function to include CORS headers
	http.ListenAndServe(":8080", withCORS(router))
}

// WebSocket handler for real-time updates
func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		return
	}
	defer conn.Close()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		fmt.Printf("Received message: %s\n", message)
		conn.WriteMessage(websocket.TextMessage, []byte("Real-time update"))
	}
}

// Handler for stock data
func stockDataHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	symbol := vars["symbol"]

	url := fmt.Sprintf("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=%s&interval=1min&apikey=%s", symbol, alphaVantageAPIKey)
	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch stock data", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	var stockData interface{}
	if err := json.Unmarshal(body, &stockData); err != nil {
		http.Error(w, "Failed to parse stock data", http.StatusInternalServerError)
		return
	}

	respondWithJSON(w, stockData)
}

// Handler for economic data
func economicHandler(w http.ResponseWriter, r *http.Request) {
	economicData := map[string]interface{}{
		"interestRates": []interface{}{ /*...*/ },
		"inflation":     []interface{}{ /*...*/ },
		"unemployment":  []interface{}{ /*...*/ },
	}
	respondWithJSON(w, economicData)
}

// Handler for order book data
func orderBookHandler(w http.ResponseWriter, r *http.Request) {
	orderBookData := map[string]interface{}{
		"bids": []interface{}{
			map[string]interface{}{
				"price":  100.00,
				"volume": 50,
			},
		},
		"asks": []interface{}{
			map[string]interface{}{
				"price":  101.00,
				"volume": 30,
			},
		},
	}
	respondWithJSON(w, orderBookData)
}

// Utility function to respond with JSON
func respondWithJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// Middleware function to add CORS headers
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Replace '*' with the specific origin if needed
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}
