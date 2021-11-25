import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("Score", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("can calculate final score", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setColumnStones("Ω", ["b", "w", "g", "b", "w"])
      game.setColumnStones("α", ["w", "g", "b", "b", "w"])
      game.setColumnStones("β", ["b", "g", "w", "b", "w"])
      game.setColumnStones("δ", ["b", "w", "g", "b", "w"])
      game.setColumnStones("π", ["b", "w", "b", "b", "w"])
      game.setColumnStones("Σ", ["b", "w", "w", "b", "w"])
      game.setColumnStones("γ", ["b", "w", "b", "b", "g"])
      
    });
    
    it("info about w/b final score", function() {
      let score = game.getScore()
      expect(score.result.b).toBe(13)
      expect(score.result.w).toBe(9)
    });

    
  })

  

  

  
  
});
