import Game from './modules/Game.js';

import TextRenderer from './modules/renderers/TextRenderer.js';


// Show Game Status
let game = new Game();
let renderer = new TextRenderer()

game.addObserver({
    notify(game){
        //console.log(game)
        document.getElementById("game").innerHTML = "<pre>" + renderer.renderGame(game) + "</pre>"
        //console.log(game.toString())
    }
})

function handleAction(action){
    console.log(action)
    game.handlingInteraction(action)
}
// https://stackoverflow.com/a/64969417
window.handleAction = handleAction
window.game = game

console.log(game)

/*
//game.setColumnStones("Ω", ["b", "b", "b", "b", "w"])
//game.setColumnStones("α", ["w", "g", "b", "b", "w"])
//game.setColumnStones("β", ["b", "g", "w", "b", "w"])
//game.setColumnStones("δ", ["b", "w", "g", "b", "w"])
//game.setColumnStones("π", ["b", "w", "w", "b", "w"])
//game.setColumnStones("Σ", ["b", "w", "b", "b", "w"])
//game.setColumnStones("γ", ["b", "w", "w", "w"])

//game.setWorkshop("b", [])

game.setQuarry("b", 2)
game.setQuarry("w", 1)
*/

//console.log(game.evolve(EventBuilder.createdBasicGameEvent("json")));
//console.log(game.evolve(EventBuilder.pickedStonesEvent("b", "w",1)));
//console.log(game.evolve(EventBuilder.pickedStonesEvent("w", "b",1)));

game.notifyObservers()