package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Root Route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to Armanda!"})
	})

	// Stock Data Route
	router.GET("/stock/:symbol", func(c *gin.Context) {
		symbol := c.Param("symbol")
		apiKey := os.Getenv("PRCL1DXGJDGCPKZB")

		data, err := fetchStock(symbol, apiKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch stock data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"symbol":    symbol,
			"stockData": data,
		})
	})

	router.Run(":8080") // Start the server on port 8080
}
