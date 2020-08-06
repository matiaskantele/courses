package main

import (
	"os"
	"testing"
)

func TestNewDeck(t *testing.T) {
	d := newDeck()

	if len(d) != 16 {
		t.Errorf("Expected deck length of %d, but got %v", 16, len(d))
	}

	if d[0] != "Ace of Spades" {
		t.Errorf("Expected first card to be %v, but got %v", "Ace of Spades", d[0])
	}

	if d[len(d)-1] != "Four of Clubs" {
		t.Errorf("Expected last card to be %v, but got %v", "Four of Clubs", d[len(d)-1])
	}
}

func TestSaveToDeckAndNewDeckFromFile(t *testing.T) {
	os.Remove("_decktesting")

	deck := newDeck()
	deck.saveToFile("_decktesting")

	loadedDeck := newDeckFromFile("_decktesting")

	if len(loadedDeck) != 16 {
		t.Errorf("Expected deck length of %d, but got %v", 16, len(loadedDeck))
	}

	os.Remove("_decktesting")
}
