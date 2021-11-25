import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("EndedTurnSpec", function() {
  
  var eventBuilder;
  
  beforeEach(function() {
    eventBuilder = new EventBuilder("ended_turn")
  });

  describe("check if ready", function(){

    it("should says is ready if playeris set", function() {
      let event = eventBuilder.player("b").build()
      expect(event.isReady()).toBe(true);
    });

    it("should says is not ready if no player is set", function() {
      let event = eventBuilder.build()
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
    
  })

});
