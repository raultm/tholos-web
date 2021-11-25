import Game from '../../modules/Game.js';
import EventBuilder from '../../modules/events/EventBuilder.js';

describe("AvailableOptions", function() {
  
  var game;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });

  it("should have two available actions.", function(){
    expect(game.availableActions().options.length).toBe(2);
  })

  it("should have interaction picked_stone and choosing between color if workshop empty because player can not place_stone.", function(){
    game.setWorkshop("b", [])
   
    expect(game.availableActions().options.length).toBe(3);
  })

  it("should have interaction placed_stone and choosing between color iin workshop  if workshop is full because player can not pick_stone.", function(){
    game.setWorkshop("b", ["b", "w", "g"])
    
    expect(game.availableActions().options.length).toBe(3);
  })


  describe("if basic play and puts a stone from its color ", () => {

    var eventBuilder;

    beforeEach(function() {
      eventBuilder = new EventBuilder("placed_stone")
    });

    it("should get three available options if Omega Option is Available To Play", function() {
      game.evolve(EventBuilder.placedStoneEvent("b", "b", "Ω"))
      game.setColumnStones("π", ["b"])
      expect(game.availableActions().options.length).toBe(3)
    })

    it("should get Omega (Ω) Option", function() {
      game.evolve(EventBuilder.placedStoneEvent("b", "b", "Ω"))
      game.setColumnStones("π", ["b"])
      expect(game.availableActions().options[0].text).toBe("Ω")
    })
  })
});
