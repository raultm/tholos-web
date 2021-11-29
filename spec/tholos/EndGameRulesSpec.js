import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("End Game", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("last stone to put before placed_stone", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g", "b", "w"])
      game.setColumnStones("α", ["w", "g", "b", "b", "w"])
      game.setColumnStones("β", ["b", "g", "w", "b", "w"])
      game.setColumnStones("δ", ["b", "w", "g", "b", "w"])
      game.setColumnStones("π", ["b", "w", "b", "b", "w"])
      game.setColumnStones("Σ", ["b", "w", "b", "b", "w"])
      game.setColumnStones("γ", ["b", "w", "b", "b"])
      
    });
    
    it("should can move stone from workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","γ"));
      expect(game.currentStatus().constructor.name).toBe("EndGame");
    });

    it("should can move stone from workshop", function() {
      game.setWorkshop("b", ["g"])
      game = game.evolve(EventBuilder.placedStoneEvent("b","g","γ"));
      expect(game.currentStatus().constructor.name).toBe("EndGame");
    });

    
  })

  describe("end game with Σ action", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setQuarry("w", 0)
      game.setQuarry("b", 0)
      game.setQuarry("g", 2)
      game.setWorkshop("w", ["w", "w"])
      game.setWorkshop("b", ["b", "b"])
      game.setColumnStones("Ω", ["b", "w", "g", "b", "w"])
      game.setColumnStones("α", ["w", "g", "b", "b", "w"])
      game.setColumnStones("β", ["b", "g", "w", "b", "w"])
      game.setColumnStones("δ", ["b", "w", "g", "b", "w"])
      game.setColumnStones("π", ["b", "w", "b", "b", "w"])
      game.setColumnStones("Σ", ["b", "w", "b", "b"])
      game.setColumnStones("γ", ["b", "w", "b", "b"])
      
    });
    
    it("should can move stone from workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Σ"));
      game = game.evolve(EventBuilder.triggeredActionEvent("b","Σ","b","γ"));
      expect(game.currentStatus().constructor.name).toBe("EndGame");
    });

    
  })

  

  

  
  
});
