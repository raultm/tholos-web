import EventBuilder from '../../../modules/events/EventBuilder.js';
import ActionBuilder from '../../../modules/actions/ActionBuilder.js';

import Game from '../../../modules/Game.js';

describe("Alfa", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check description", function(){
    it("should return α description", function() {
      let action = ActionBuilder.fromName("α")
      expect(action.getDescription()).toBe("May move the g top stone of the column at a different temple location to a third different —and valid— temple location.")
    });
  })

  describe("check availableActions on ChooseAction stage", function(){

    it("should return α action if ChooseAction invoked with placed_stone and player/stone same color & different column with gray stone in top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","α"))
      game.setColumnStones("Ω", ["g"])
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("α")
    });
    
    it("should return α action if ChooseAction invoked with placed_stone and player/stone same color & different column with gray stone in top", function() {
      game.setWorkshop("b", ["g", "g"])
      game.evolve(EventBuilder.placedStoneEvent("b","g","Ω"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.evolve(EventBuilder.placedStoneEvent("w","w","α"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("α")
    });
    
    it("should NOT return α action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color & even with column with black stone in top", function() {
      game.setWorkshop("b", ["g", "g"])
      game.evolve(EventBuilder.placedStoneEvent("b","g","Ω"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","α"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });

    it("should NOT return α action if ChooseAction invoked with placed_stone and player/stone same color but no column has gray stone on top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","α"))
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });
  
  });
  
  describe("check if ready", function(){
    
  
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
    });

    it("should says is ready if player, action, source and target are set", function() {
      let event = eventBuilder.player("b").action("α").source("Ω").target("π").build()
      expect(event.isReady()).toBe(true);
    });
    
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("α").build()
      expect(event.isReady()).toBe(false);
    });

    it("should says is not ready if no target is set", function() {
      let event = eventBuilder.player("b").action("α").source("Ω").build()
      expect(event.isReady()).toBe(false);
    });
    
  })

  describe("check availableActions if interaction is not complete", function(){

    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","α"))
    });

    describe("from which columne", function(){
      
      it("should return column with gray stones to move", function() {
        let event = eventBuilder.player("b").action("α").build()
        game.setInteraction(event.json())
        game.setColumnStones("Ω", ["g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message[0]).toBe("b is playing α action")
        expect(availableActions.message[1]).toBe("b needs to select source column with a g stone on top")
        expect(availableActions.message[2]).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("Ω");
      });
      
      it("should return multiple columns with gray stones to move", function() {
        let event = eventBuilder.player("b").action("α").build()
        game.setInteraction(event.json())
        game.setColumnStones("Ω", ["g"])
        game.setColumnStones("γ", ["g"])
  
        let availableActions = event.availableActions(game)
        expect(availableActions.message[0]).toBe("b is playing α action")
        expect(availableActions.message[1]).toBe("b needs to select source column with a g stone on top")
        expect(availableActions.message[2]).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("Ω");
        expect(availableActions.options[1].text).toBe("γ");
      });
      
      it("should NOT return column with black stones to move if column associated with the action", function() {
        let event = eventBuilder.player("b").action("α").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["g"])
        game.setColumnStones("γ", ["g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message[2]).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("γ");
      });
      
    })

    describe("to which columne", function(){
      
      it("should return columns with empty space avoiding two columns (column that trigger action and column use as source)", function() {
        let event = eventBuilder.player("b").action("α").source("β").build()
        game.setInteraction(event.json())
        game.setColumnStones("β", ["b"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message[0]).toBe("b is playing α action")
        expect(availableActions.message[1]).toBe("b has selected β as source column")
        expect(availableActions.message[2]).toBe("b needs to select target column")
        expect(availableActions.message[3]).toBe("To which column?")
        expect(availableActions.options.length).toBe(5);
        expect(availableActions.options[0].text).toBe("Ω");
        expect(availableActions.options[1].text).toBe("δ");
        expect(availableActions.options[2].text).toBe("π");
        expect(availableActions.options[3].text).toBe("Σ");
        expect(availableActions.options[4].text).toBe("γ");
      });
      
      it("should return columns with empty space avoiding two columns (column that trigger action and column use as source)", function() {
        let event = eventBuilder.player("b").action("α").source("Ω").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["b"])
        game.setColumnStones("β", ["b", "w"])
        game.setColumnStones("δ", ["b", "w", "g", "g", "g"])
        game.setColumnStones("γ", ["b", "w", "g", "g", "g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message[0]).toBe("b is playing α action")
        expect(availableActions.message[1]).toBe("b has selected Ω as source column")
        expect(availableActions.message[2]).toBe("b needs to select target column")
        expect(availableActions.message[3]).toBe("To which column?")
        expect(availableActions.options.length).toBe(3);
        expect(availableActions.options[0].text).toBe("β");
        expect(availableActions.options[1].text).toBe("π");
        expect(availableActions.options[2].text).toBe("Σ");
      });
      
      
    })
    

    
  })
  
});