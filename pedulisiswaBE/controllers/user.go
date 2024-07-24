package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type User struct {
	NIK  uint32 `json:"NIK"`
	Nama string `json:"Nama"`
}

var Secretkeyy = []byte(os.Getenv("SECRET_KEY"))

func Generatetoken(nik uint32, nama string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"NIK":  nik,
		"Nama": nama,
		"exp":  time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString(Secretkeyy)
}

func Login(c *gin.Context) {

	var Loginreq User
	if err := c.ShouldBindJSON(&Loginreq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dir := "./users"

	fileName := filepath.Join(dir, fmt.Sprintf("NIK_%d_Name_%s.txt", Loginreq.NIK, Loginreq.Nama))
	err := os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Terjadi kesalahan saat membuat direktori", "details": err.Error()})
		return
	}

	fmt.Println("nama file kontol:", fileName)

	_, err = os.Open(fileName)
	if err != nil {
		if os.IsNotExist(err) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "NIK atau Nama tidak ditemukan"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Terjadi kesalahan saat membuka file"})
		}
		return
	}

	token, err := Generatetoken(Loginreq.NIK, Loginreq.Nama)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Terjadi kesalahan saat membuat token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login Berhasil",
		"token":   token,
	})
}

func Register(c *gin.Context) {
	var Loginreq User
	if err := c.ShouldBindJSON(&Loginreq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dir := "./users"

	fileName := filepath.Join(dir, fmt.Sprintf("NIK_%d_Name_%s.txt", Loginreq.NIK, Loginreq.Nama))
	_, err := os.Stat(fileName)
	if err == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "NIK sudah terdaftar"})
		return
	} else if !os.IsNotExist(err) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Terjadi kesalahan saat memeriksa file"})
		return
	}

	err = os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Terjadi kesalahan saat membuat direktori", "details": err.Error()})
		return
	}
	_, err = os.Create(fileName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Terjadi kesalahan saat membuat file"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Register Berhasil"})
}
