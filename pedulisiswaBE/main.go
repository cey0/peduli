package main

import (
	"backend/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Replace with your front-end origin
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	r.Run(":8080")
}
