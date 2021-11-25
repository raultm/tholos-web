import State from './State.js';
import PlayerTurn from './PlayerTurn.js';
import EventBuilder from '../events/EventBuilder.js';

export default class InitialState extends State {
    
    constructor(){
        super()
        super.setName("ready to start")
    }

    availableActions(){
        return {
            message:"Setup new Game",
            options:[
                {
                    text: "Basic Game",
                    interaction: EventBuilder.createdBasicGameEventJson()
                }
            ]
        }
    }

    evolve(game, event) {
        switch (event.type) {
            case "created_game":
                ["Ω","α","β","δ","π","Σ","γ"].map(value => {
                    game.setColumnStones(value, [])
                    game.emptyColumnActions(value)
                    game.addColumnAction(value, value)
                })
                game.setQuarry("b", 13)
                game.setQuarry("w", 13)
                game.setQuarry("g", 10)
                game.setWorkshop("b", ["b", "b"])
                game.setWorkshop("w", ["w", "w"])
                return game.setStatus(new PlayerTurn("b"))
            default:
                return super.evolve(game, event)
        }
    }

    on(){

    }
}