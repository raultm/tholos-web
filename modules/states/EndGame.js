import State from './State.js';

export default class EndGame extends State {
    
    constructor(){
        super()
        super.setName("End of Game")
    }

    availableActions(game){
        let score = game.getScore();
        let columnsInfo = score.columns.map( column => `${column.column} - ${column.points} to ${column.winner} - b:${column.countBy.b}  w:${column.countBy.w}  g:${column.countBy.g  }`)
        let message = [
            "The game has finished.", 
            `w has ${score.result.w} points`, 
            `b has ${score.result.b} points`,
            `------------------------------`,
            `Columns`,
        ]
        message = message.concat(columnsInfo)
        return { message: message, options: []}
    }
    
    on(game){
        // Calculate Points
    }

    evolve(game, event, parentStatus){
        switch(event.type){
            default:
                throw new Error(`${event.type} event is not available in ${this.constructor.name} Stage`)
        }
    }
}