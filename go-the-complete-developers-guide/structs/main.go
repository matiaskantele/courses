package main

import (
	"fmt"
)

type contactInfo struct {
	email   string
	zipCode int
}

type person struct {
	firstName string
	lastName  string
	contactInfo
}

func main() {
	ironman := person{
		firstName: "Tony",
		lastName:  "Stark",
		contactInfo: contactInfo{
			email:   "tony@starkindustries.com",
			zipCode: 10005,
		},
	}

	ironman.updateName("Tina")
	ironman.print()
}

func (p *person) updateName(newFirstName string) {
	(*p).firstName = newFirstName
}

func (p person) print() {
	fmt.Printf("%+v", p)
}
