import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';
import PlayerTurn from '../../modules/states/PlayerTurn.js';

describe("Game", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("Handling External Interaction", function(){
    
    it("should have empty interaction object if no interaction received yet", function() {
        expect(game.getInteraction()).toEqual({})
    });

    it("should store interaction if not ready in the game status if case we need the last interacion", function() {
      let interaction = {type: "picked_stones"}
      
      game.handlingInteraction(interaction)

      expect(game.getInteraction()).toBe(interaction)
    });

    it("should call the status method handling interaction", function() {
      let interaction = {type: "created_game"}
      let status = game.currentStatus()

      spyOn(status, 'handlingInteraction').withArgs(game, interaction)

      game.handlingInteraction(interaction)

      expect(status.handlingInteraction).toHaveBeenCalled();        
    });
  
  })

});
