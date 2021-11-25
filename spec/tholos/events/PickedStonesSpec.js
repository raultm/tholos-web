import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("PickedStonesEvent", function() {
  
  var eventBuilder;
  
  beforeEach(function() {
    eventBuilder = new EventBuilder("picked_stones")
  });

  describe("check if ready", function(){

    it("should says is ready if player, color and amount are set", function() {
      let event = eventBuilder.player("b").color("b").amount(1).build()
      expect(event.isReady()).toBe(true);
    });
  
    it("should says is not ready if no player is set", function() {
      let event = eventBuilder.color("b").amount(1).build()
      expect(event.isReady()).toBe(false);
    });
  
    it("should says is not ready if no color is set", function() {
      let event = eventBuilder.player("b").amount(1).build()
      expect(event.isReady()).toBe(false);
    });
  
    it("should says is not ready if no amount is set", function() {
      let event = eventBuilder.player("b").player(1).build()
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

    it("should return stones colors as available options if no color", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      let event = eventBuilder.player("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("Which color?")
      expect(availableActions.options[0].text).toBe("Black");
      expect(availableActions.options[1].text).toBe("White");
      expect(availableActions.options[2].text).toBe("Gray");
    });

    it("should do not show color if empty in quarry", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",["w", "g"])
      game.setQuarry("b",0)
      let event = eventBuilder.player("b").build()
      
      let availableActions = event.availableActions(game)
      
      expect(availableActions.message).toBe("Which color?")
      expect(availableActions.options[0].text).toBe("White");
      expect(availableActions.options[1].text).toBe("Gray");
    });

    it("should get 3 possible actions if same color & empty workshop", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",[])
      let event = eventBuilder.player("b").color("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("How many stones?")
      expect(availableActions.options.length).toBe(3);
      expect(availableActions.options[0].text).toBe("1");
      expect(availableActions.options[1].text).toBe("2");
      expect(availableActions.options[2].text).toBe("3");
    });

    it("should get 2 possible actions if same color & two empty spaces", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",["w"])
      let event = eventBuilder.player("b").color("b").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("How many stones?")
      expect(availableActions.options.length).toBe(2);
      expect(availableActions.options[0].text).toBe("1");
      expect(availableActions.options[1].text).toBe("2");
    });

    it("should get 2 possible actions if same color & one empty spaces", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",["w", "g"])
      let event = eventBuilder.player("b").color("b").build()
      
      let availableActions = event.availableActions(game)
      
      expect(availableActions.message).toBe("What do you want to do?")
      expect(availableActions.options.length).toBe(2);
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn");
      expect(availableActions.options[1].text).toBe("Confirm End Of Turn");
    });

    it("should get 1 possible actions if same color & one empty spaces", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",[])
      game.setQuarry("b",2)
      let event = eventBuilder.player("b").color("b").build()
      let availableActions = event.availableActions(game)
      //console.log(avai)
      
      expect(availableActions.message).toBe("How many stones?")
      expect(availableActions.options.length).toBe(2);
      expect(availableActions.options[0].text).toBe("1");
      expect(availableActions.options[1].text).toBe("2");
     });

    

    it("should get 2 possible actions if gray color even if empty workshop", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",[])
      let event = eventBuilder.player("b").color("g").build()
      let availableActions = event.availableActions(game)
      expect(availableActions.message).toBe("How many stones?")
      expect(availableActions.options.length).toBe(2);
      expect(availableActions.options[0].text).toBe("1");
      expect(availableActions.options[1].text).toBe("2");
    });

    it("should evolve the game to new stage ChooseAction if gray color but only one slot available in workshop", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",["b", "w"])
      let event = eventBuilder.player("b").color("g").build()
      
      let availableActions = event.availableActions(game)
      
      expect(availableActions.message).toBe("What do you want to do?")
      expect(availableActions.options.length).toBe(2);
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn");
      expect(availableActions.options[1].text).toBe("Confirm End Of Turn");
    });

    it("should evolve the game to new stage ChooseAction", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.setWorkshop("b",[])
      let event = eventBuilder.player("b").color("w").build()
      
      
      let availableActions = event.availableActions(game)
      
      expect(availableActions.message).toBe("What do you want to do?")
      expect(availableActions.options.length).toBe(2);
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn");
      expect(availableActions.options[1].text).toBe("Confirm End Of Turn");
    });

    it("should let white after black pick one black stone", function() {
      let game = new Game();
      game.evolve(EventBuilder.createdBasicGameEvent("json"))
      game.evolve(EventBuilder.pickedStonesEvent("b", "b", 1))
      game.evolve(EventBuilder.endedTurnEvent("b"));
      
      let event = eventBuilder.player("w").color("w").build()
      event.availableActions(game)
      
      expect(game.white().workshop.length).toBe(3);
    });
  
  })
  

});
