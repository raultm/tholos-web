import Event from "./Event.js"

export default class PlacedStones extends Event{

    #player
    #color
    #column

    constructor(player,color, column){
        super()
        this.#player = player
        this.#color = color
        this.#column = column
    }

    json(){
        return {
            "type" : "placed_stone",
            "data" : {
                "player" : this.#player,
                "color" : this.#color,
                "column": this.#column
            }
        }
    }

    isReady(){
        if(!this.#player){ return false }
        if(!this.#color){ return false }
        if(!this.#column){ return false }
        return true
    }

    availableActions(game){
        if(!this.#player){ return this.actionsWhenNoPlayer() }
        if(!this.#color){ return this.actionsWhenNoColor(game) }
        if(!this.#column){ return this.actionsWhenNoColumn(game) }
    }

    actionsWhenNoPlayer(){
        let blackInteraction = this.json()
        blackInteraction.data.player = "b"
        let whiteInteraction = this.json()
        whiteInteraction.data.player = "w"
        return {
            message:"Which player?",
            options:[
                {text:"Black", interaction:blackInteraction},
                {text:"White", interaction:whiteInteraction}
            ]
        }
    }

    actionsWhenNoColor(game){
        let blackInteraction = this.json()
        blackInteraction.data.color = "b"
        let whiteInteraction = this.json()
        whiteInteraction.data.color = "w"
        let grayInteraction = this.json()
        grayInteraction.data.color = "g"

        let options = []
        let playerWorkshop = game.player(this.#player).workshop
        if(playerWorkshop.includes("b")){
            options.push({text:"Black", interaction:blackInteraction})
        }
        if(playerWorkshop.includes("w")){
            options.push({text:"White", interaction:whiteInteraction})
        }
        if(playerWorkshop.includes("g")){
            options.push({text:"Gray", interaction:grayInteraction})
        }

        if(options.length == 1){
            game.handlingInteraction(options[0].interaction)
            return game.availableActions()
        }

        return {
            message:"Which color?",
            options:options
        }
    }

    actionsWhenNoColumn(game){
        let columnNames = Object.keys(game.columns())
        let options = []
        columnNames.map( name => {
            if(game.isAvailableSpaceInColumn(name)){
                let columnInteraction = this.json()
                columnInteraction.data.column = name
                options.push({text:name, interaction:columnInteraction})
            }
        }, this)
        
        return {
            message:"In which column?",
            options:options
        }
    }
}