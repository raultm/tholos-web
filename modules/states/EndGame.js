import State from './State.js';

export default class EndGame extends State {
    
    constructor(){
        super()
        super.setName("End of Game")
    }

    availableActions(game){
        let score = game.getScore();
        return {
            message:[
                "The game has finished.", 
                `w has ${score.result.w} points`, 
                `b has ${score.result.b} points`
            ], options: []}
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