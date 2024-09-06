package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var db *sql.DB

// initDB initializes the database connection
func initDB() {
	var err error
	connStr := "user=postgres dbname=armanda sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Database connected!")
}

// saveStockData saves stock data to the database
func saveStockData(symbol string, price string) error {
	query := `INSERT INTO stock_history (symbol, timestamp, price) VALUES ($1, now(), $2)`
	_, err := db.Exec(query, symbol, price)
	return err
}
