const newDeck = document.querySelector("#new-deck")
const newCards = document.querySelector("#draw-cards")
const card1 = document.querySelector("#card1")
const card2 = document.querySelector("#card2")
const title = document.querySelector("#title")
let deckId
let card1Score = 0
let card2Score = 0

newDeck.addEventListener("click", getNewDeck)
newCards.addEventListener("click", getNewCards)

async function getNewDeck() {
  const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  const data = await response.json()
  deckId = data.deck_id
  document.querySelector(
    "#remaining-cards"
  ).innerHTML = `Remaining cards : ${data.remaining} cards`
  title.textContent = `Game Has Started`
  // console.log(data)
}

async function getNewCards() {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  const data = await response.json()
  document.querySelector(
    "#remaining-cards"
  ).innerHTML = `Remaining cards : ${data.remaining} cards`
  card1.innerHTML = `<img src = '${data.cards[0].image}'/>`
  card2.innerHTML = `<img src = '${data.cards[1].image}'/>`

  // console.log(data)
  const duelResult = compareValue(data.cards[0], data.cards[1])
  title.textContent = duelResult

  if (data.remaining === 0) {
    newCards.disabled = true
    if (card1Score > card2Score) {
      title.textContent = `Computer has Won it all!!`
    } else if (card1Score < card2Score) {
      title.textContent = `You have Won it all!!`
    } else {
      title.textContent = `I can't believe it's a draw!`
    }
  }
}

function compareValue(computer, player) {
  const deckValue = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE"
  ]
  const card1value = deckValue.indexOf(computer.value)
  const card2value = deckValue.indexOf(player.value)

  if (card1value > card2value) {
    card1Score += 1
    document.querySelector("#card1-score").textContent = `Computer score : ${card1Score}`
    return "AI Wins!"
  } else if (card1value < card2value) {
    card2Score += 1
    document.querySelector("#card2-score").textContent = `Player score : ${card2Score}`
    return "You win!"
  } else {
    return "WOW!! It's a draw"
  }
}
