import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("PlacedStoneEvent", function() {
  
  var eventBuilder;
  
  beforeEach(function() {
    eventBuilder = new EventBuilder("placed_stone")
  });

  describe("check if ready", function(){

    it("should says is ready if player, color and column are set", function() {
      let event = eventBuilder.player("b").color("b").column("π").build()
      expect(event.isReady()).toBe(true);
    });
  
    it("should says is not ready if no player is set", function() {
      let event = eventBuilder.color("b").column("π").build()
      expect(event.isReady()).toBe(false);
    });
  
    it("should says is not ready if no color is set", function() {
      let event = eventBuilder.player("b").column("π").build()
      expect(event.isReady()).toBe(false);
    });
  
    it("should says is not ready if no column is set", function() {
      let event = eventBuilder.player("b").color("b").build()
      expect(event.isReady()).toBe(false);
    });

  })

  describe("check availableActions", function(){

    it("should return players colors as available options if no player", function() {
      let event = eventBuilder.build()
      let availableActions = event.availableActions()
      expect(availableActions.message).toBe("Which player?")
      expect(availableActions.options[0].text).toBe("Black");
      expect(availableActions.options[1].text).toBe("White");
    });

    it("should return stones colors as available options if no player", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b", ["b","g","w"])
      
      let event = eventBuilder.player("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("Which color?")
      expect(availableActions.options[0].text).toBe("Black");
      expect(availableActions.options[1].text).toBe("White");
      expect(availableActions.options[2].text).toBe("Gray");
    });

    it("should return stones colors as available options, if user hast it in workshop", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b", ["b","g"])
      
      let event = eventBuilder.player("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("Which color?")
      expect(availableActions.options[0].text).toBe("Black");
      expect(availableActions.options[1].text).toBe("Gray");
    });

    it("should columns options if only one stone color", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b", ["g"])
      
      let event = eventBuilder.player("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("In which column?")
      expect(availableActions.options[0].text).toBe("Ω");
    });

    it("should get 7 possible actions if all columns empty", function() {
      let game = new Game([EventBuilder.createdBasicGameEvent("json")]);
      let event = eventBuilder.player("b").color("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("In which column?")
      expect(availableActions.options.length).toBe(7);
    });

    it("should get 6 possible actions if one column has no space left", function() {
      let game = new Game([EventBuilder.createdBasicGameEvent("json")]);
      game.setColumnStones("π", ["b","b","g","w","w"])
      let event = eventBuilder.player("b").color("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("In which column?")
      expect(availableActions.options.length).toBe(6);
    });

    it("should get 4 possible actions if three columns has no space left", function() {
      let game = new Game([EventBuilder.createdBasicGameEvent("json")]);
      game.setColumnStones("π", ["b","b","g","w","w"])
      game.setColumnStones("Σ", ["b","b","g","w","w"])
      game.setColumnStones("γ", ["b","b","g","w","w"])

      let event = eventBuilder.player("b").color("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("In which column?")
      expect(availableActions.options.length).toBe(4);
    });
  })
  

});
