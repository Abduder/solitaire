/*
** Set should contain 104 cards
** When game starts 54 cards are dealt (10 -> 10 -> 10 -> 10 -> 4)
** Cards that remain after dealing are split into 5 decks
** Deck contains 10 cards
*/
export default class cardSetManager{
    constructor(){
        this.set = cardSetManager.generateSetOfCards();
        this.shuffleSet();
    }

    shuffleSet(){
        for (let i = this.set.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.set[i], this.set[j]] = [this.set[j], this.set[i]];
        }
    }

    dealCard(){
        const dealt = this.set.shift(); //delete card from set because it's now in play, browser will manage that
        return dealt;
    }

    // getDeckByIndex(index){
    //     return this.set.slice(index*10, index*10+10); 
    // }

    static generateSetOfCards() {
        const numberOfCardsPerType = 13;
        const types = ["spades", "diamonds", "hearts", "clubs"];
        const numberOfOccurences = 2;
        const cards = [];
    
        for(const type of types){
            for(var occurence = 1; occurence <= numberOfOccurences; occurence ++){
                for(var number = 1; number <= numberOfCardsPerType; number++){
                    cards.push({
                        type,
                        number
                    })
                }
            }
        }
    
        return cards;
    }
}
