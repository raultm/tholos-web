import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';
import TextRenderer from '../../../modules/renderers/TextRenderer.js';

describe("Omega", function() {
  
  var game;
  var eventBuilder;
  
  beforeEach(function() {
    game = new Game();
    game = game.evolve(EventBuilder.createdBasicGameEventJson());
  });
  
  describe("check availableActions on ChooseAction stage", function(){

    it("should return Ω action if ChooseAction invoked with placed_stone and player/stone same color & different column with black stone in top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"))
      game.setColumnStones("α", ["b"])
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("Ω")
    });

    it("should return Ω action if ChooseAction invoked with placed_stone and player/stone same color & different column with black stone in top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","α"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.evolve(EventBuilder.placedStoneEvent("w","w","Ω"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(3)
      expect(availableActions.options[0].text).toBe("Ω")
    });

    it("should NOT return Ω action if ChooseAction invoked with placed_stone and player/stone DIFFERENT color & even with column with black stone in top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","α"))
      game.evolve(EventBuilder.endedTurnEvent("b"))
      game.setWorkshop("w", ["b", "w"])
      game.evolve(EventBuilder.placedStoneEvent("w","b","Ω"))
      
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });

    it("should NOT return Ω action if ChooseAction invoked with placed_stone and player/stone same color but no column has black stone on top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"))
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
      expect(availableActions.options[0].text).toBe("Undo the Whole Turn")
    });

    
    it("should NOT return Ω action if ChooseAction invoked with placed_stone and player/stone same color & same column with black stone in top", function() {
      game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"))
      game.setColumnStones("Ω", ["b"])
      let availableActions = game.availableActions(game)

      expect(availableActions.options.length).toBe(2)
    });


  });

  describe("check if ready", function(){
    
  
    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
    });

    it("should says is ready if player, action, source and target are set", function() {
      let event = eventBuilder.player("b").action("Ω").source("α").target("π").build()
      expect(event.isReady()).toBe(true);
    });
  
    it("should says is not ready if no source is set", function() {
      let event = eventBuilder.player("b").action("Ω").build()
      expect(event.isReady()).toBe(false);
    });

    it("should says is not ready if no target is set", function() {
      let event = eventBuilder.player("b").action("Ω").source("α").build()
      expect(event.isReady()).toBe(false);
    });
    
  })

  describe("check availableActions if interaction is not complete", function(){

    beforeEach(function() {
      eventBuilder = new EventBuilder("triggered_action")
      game.evolve(EventBuilder.placedStoneEvent("b","b","Ω"))
    });

    describe("from which columne", function(){
      it("should return column with black stones to move", function() {
        let event = eventBuilder.player("b").action("Ω").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["b"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("α");
      });
  
      it("should return multiple columns with black stones to move", function() {
        let event = eventBuilder.player("b").action("Ω").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["b"])
        game.setColumnStones("γ", ["b"])
  
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("α");
        expect(availableActions.options[1].text).toBe("γ");
      });
  
      it("should NOT return column with black stones to move if column associated with the action", function() {
        let event = eventBuilder.player("b").action("Ω").build()
        game.setInteraction(event.json())
        game.setColumnStones("Ω", ["b"])
        game.setColumnStones("α", ["b"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("From which column?")
        expect(availableActions.options[0].text).toBe("α");
      });
    })

    describe("to which columne", function(){
      
      it("should return columns with empty space avoiding two columns (column that trigger action and column use as source)", function() {
        let event = eventBuilder.player("b").action("Ω").source("α").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["b"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("To which column?")
        expect(availableActions.options.length).toBe(5);
        expect(availableActions.options[0].text).toBe("β");
        expect(availableActions.options[1].text).toBe("δ");
        expect(availableActions.options[2].text).toBe("π");
        expect(availableActions.options[3].text).toBe("Σ");
        expect(availableActions.options[4].text).toBe("γ");
      });

      it("should return columns with empty space avoiding two columns (column that trigger action and column use as source)", function() {
        let event = eventBuilder.player("b").action("Ω").source("α").build()
        game.setInteraction(event.json())
        game.setColumnStones("α", ["b"])
        game.setColumnStones("β", ["b", "w"])
        game.setColumnStones("δ", ["b", "w", "g", "g", "g"])
        game.setColumnStones("γ", ["b", "w", "g", "g", "g"])
        let availableActions = event.availableActions(game)
        expect(availableActions.message).toBe("To which column?")
        expect(availableActions.options.length).toBe(3);
        expect(availableActions.options[0].text).toBe("β");
        expect(availableActions.options[1].text).toBe("π");
        expect(availableActions.options[2].text).toBe("Σ");
      });
  
      
    })
    

    
  })
  
});