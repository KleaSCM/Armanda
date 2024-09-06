package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

var stockData = map[string][]StockPrice{
	"AAPL": {{Time: "10:00", Price: 123.45}, {Time: "10:01", Price: 122.90}},
	"GOOG": {{Time: "10:00", Price: 678.90}, {Time: "10:01", Price: 679.45}},
	"TSLA": {{Time: "10:00", Price: 750.00}, {Time: "10:01", Price: 745.10}},
}

type StockPrice struct {
	Time  string  `json:"time"`
	Price float64 `json:"price"`
}

func getStockData(symbol string) ([]StockPrice, bool) {
	data, exists := stockData[symbol]
	return data, exists
}

func handleConnection(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			// Allow all origins (be cautious with this in production)
			return true
		},
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error while upgrading connection:", err)
		http.Error(w, "Failed to upgrade connection", http.StatusInternalServerError)
		return
	}
	defer conn.Close()

	log.Println("WebSocket connection established")

	for {
		messageType, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error while reading message:", err)
			break
		}

		symbol := strings.TrimSpace(string(msg))
		data, exists := getStockData(symbol)
		if !exists {
			log.Println("Stock symbol not found:", symbol)
			continue
		}

		response, err := json.Marshal(data)
		if err != nil {
			log.Println("Error while marshaling data:", err)
			continue
		}

		err = conn.WriteMessage(messageType, response)
		if err != nil {
			log.Println("Error while writing message:", err)
			break
		}
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/ws", handleConnection) // WebSocket route

	handler := cors.Default().Handler(mux)
	log.Println("Server started on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal("Server failed:", err)
	}
}
