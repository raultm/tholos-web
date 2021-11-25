import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("Undo Turn", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("black in its turn after setup", function() {

    beforeEach(function() {
      game.evolve(EventBuilder.createdBasicGameEventJson());
    });
    
    it("should allow black undo turn after move stone from workshop", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      game.evolve(EventBuilder.undoTurnEvent())

      expect(game.black().workshop.length).toBe(2);
      expect(game.column("Ω").stones).toEqual([]);
    });

    it("should allow white undo turn after move stone from workshop", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      game.evolve(EventBuilder.endedTurnEvent())
      game.evolve(EventBuilder.placedStoneEvent("w","w","Ω"));
      game.evolve(EventBuilder.undoTurnEvent())

      expect(game.black().workshop.length).toBe(1);
      expect(game.white().workshop.length).toBe(2);
      expect(game.column("Ω").stones).toEqual(["b"]);
    });
    
  })

});
