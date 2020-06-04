const quotes = ()=>{
    let randIdx = Math.floor(Math.random() * Math.floor(10));

    const quotesArr = {
        0: "Rule No. 1: Never lose money. Rule No. 2: Never forget rule No.1",
        1: "Risk comes from not knowing what you are doing.",
        2: "Our favorite holding period is forever.",
        3: "Time is the friend of the wonderful company, the enemy of the mediocre.",
        4: "Forecasts may tell you a great deal about the forecaster; they tell you nothing about the future.",
        5: "It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you’ll do things differently.",
        6: "Someone’s sitting in the shade today because someone planted a tree a long time ago.",
        7: "Chains of habit are too light to be felt until they are too heavy to be broken.",
        8: "The most important investment you can make is in yourself.",
        9: "It’s better to hang out with people better than you. Pick out associates whose behavior is better than yours and you’ll drift in that direction."        
    }
    
    return quotesArr[randIdx]
}

module.exports = {
    getQuotes: quotes
}