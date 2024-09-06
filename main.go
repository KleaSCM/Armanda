package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	router := gin.Default()

	// Root Route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to Armanda!"})
	})

	// Stock Data Route
	router.GET("/stock/:symbol", func(c *gin.Context) {
		symbol := c.Param("symbol")
		apiKey := os.Getenv("ALPHA_VANTAGE_API_KEY")

		data, err := fetchStock(symbol, apiKey) // Ensure fetchStock is defined in the same package
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
