import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("Place Stones", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
  });

  describe("black in its turn after setup", function() {

    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
    });
    
    it("should can move stone from workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      expect(game.black().workshop.length).toBe(1);
      expect(game.column("Ω").stones).toEqual(["b"]);
    });

    
  })

  describe("player can not place stone if no available in workshop", function(){
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.emptyWorkshop("b")
    });

    it("should can NOT move own stone if doesn't available in workshop", function() {
      expect( () => game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω")) ).toThrow(new Error("b does not have a b stone in workshop"));
    });

    it("should can NOT move rival stone if doesn't available in workshop", function() {
      expect( () => game = game.evolve(EventBuilder.placedStoneEvent("b","w","Ω")) ).toThrow(new Error("b does not have a w stone in workshop"));
    });

    it("should can NOT move neutral stone if doesn't available in workshop", function() {
      expect( () => game = game.evolve(EventBuilder.placedStoneEvent("b","g","Ω")) ).toThrow(new Error("b does not have a g stone in workshop"));
    });
  })

  describe("player can place stone if available in workshop", function(){
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setWorkshop("b", ["b", "w", "g"])
    });

    it("should can move own stone if available in workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      expect(game.black().workshop.length).toBe(2);
      expect(game.column("Ω").stones).toEqual(["b"]);
    });

    it("should can move rival stone if available in workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","w","Ω"));
      expect(game.black().workshop.length).toBe(2);
      expect(game.column("Ω").stones).toEqual(["w"]);
    });

    it("should can move neutral stone if available in workshop", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","g","Ω"));
      expect(game.black().workshop.length).toBe(2);
      expect(game.column("Ω").stones).toEqual(["g"]);
    });
  })

  describe("after place stones", function(){
    
    beforeEach(function() {
      game = game.evolve(EventBuilder.createdBasicGameEventJson());
      game.setWorkshop("b", ["b", "w", "g"])
    });

    it("should move to choose action stage if stone color is player color", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"));
      expect(game.currentStatus().name()).toBe("b to play")
      expect(game.currentStatus().stage().name()).toBe("b must choose between available actions")
    });

    it("should move to Choose Action Stage if white stone", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","w","Ω"));
      expect(game.currentStatus().name()).toBe("b to play")
      expect(game.currentStatus().stage().constructor.name).toBe("ChooseAction")
    });

    it("should move to Choose Action Stage if gray stone", function() {
      game = game.evolve(EventBuilder.placedStoneEvent("b","g","Ω"));
      expect(game.currentStatus().name()).toBe("b to play")
      expect(game.currentStatus().stage().constructor.name).toBe("ChooseAction")
    });
  })
  
});
