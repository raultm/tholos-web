import EventBuilder from '../../../modules/events/EventBuilder.js';

import Game from '../../../modules/Game.js';

describe("UndoTurnSpec", function() {
  
  var eventBuilder;
  
  beforeEach(function() {
    eventBuilder = new EventBuilder("undo_turn")
  });

  describe("check if ready", function(){

    it("should says alway true", function() {
      let event = eventBuilder.build()
      expect(event.isReady()).toBe(true);
    });

  })

  describe("check availableActions", function(){

    it("should return no actions", function() {
      let event = eventBuilder.build()
      let availableActions = event.availableActions()
      expect(availableActions).toEqual([])
    });
    
  })

});
