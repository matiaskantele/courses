package main

import (
	"fmt"
	"io"
	"os"
)

type logWriter struct{}

func main() {
	filename := os.Args[1]
	file, err := os.Open(filename)
	defer file.Close()
	if err != nil {
		fmt.Println("Unable to read file. Exiting...")
		os.Exit(1)
	}

	lw := logWriter{}

	io.Copy(lw, file)
}

func (logWriter) Write(bs []byte) (int, error) {
	fmt.Println(string(bs))
	return len(bs), nil
}
