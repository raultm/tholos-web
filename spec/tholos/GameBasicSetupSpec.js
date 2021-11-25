import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("Game", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  it("should have an initial state", function() {
    expect(game.currentStatus().name()).toBe('ready to start');
  });

  describe("when created basic game event occurs", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
    });

    it("should have b as current player", function() {
      expect(game.currentPlayer()).toBe("b");
    });

    it("should have an event in its history", function() {
      expect(game.events().length).toBe(1);
    });

    it("should have 7 columns", function() {
      expect(Object.keys(game.columns()).length).toBe(7);
    });

    it("should have columns with 0 stones", function() {
      expect(game.columns()["Ω"].stones.length).toBe(0);
      expect(game.columns()["α"].stones.length).toBe(0);
      expect(game.columns()["β"].stones.length).toBe(0);
      expect(game.columns()["δ"].stones.length).toBe(0);
      expect(game.columns()["π"].stones.length).toBe(0);
      expect(game.columns()["Σ"].stones.length).toBe(0);
      expect(game.columns()["γ"].stones.length).toBe(0);
    });

    it("should have columns with 0 stones", function() {
      expect(game.columns()["Ω"].actions.length).toBe(1);
      expect(game.columns()["α"].actions.length).toBe(1);
      expect(game.columns()["β"].actions.length).toBe(1);
      expect(game.columns()["δ"].actions.length).toBe(1);
      expect(game.columns()["π"].actions.length).toBe(1);
      expect(game.columns()["Σ"].actions.length).toBe(1);
      expect(game.columns()["γ"].actions.length).toBe(1);
    });

    it("should have quarry full", function() {
      expect(game.quarry()["w"]).toBe(13);
      expect(game.quarry()["b"]).toBe(13);
      expect(game.quarry()["g"]).toBe(10);
    });

    it("should have status 'black to play'", function() {
      expect(game.currentStatus().name()).toBe('b to play');
    });

    it("should have two players with 0 points", function(){
      expect(game.black().score).toBe(0);
      expect(game.white().score).toBe(0);
    })

    it("each player should have two stonesof its color in their workshop", function(){
      expect(game.black().workshop).toEqual(["b", "b"]);
      expect(game.white().workshop).toEqual(["w", "w"]);
    })

    it("should have three available actions. Pick, Put and nothing", function(){
      expect(game.availableActions().options.length).toBe(2);
    })
  })

});
