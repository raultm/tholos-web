export default class PickedStones {

    #player
    #color
    #column

    constructor(player,color, column){
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
}