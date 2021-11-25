import EventBuilder from '../../../modules/events/EventBuilder.js';

describe("CreatedBasicGame", function() {
  
  var event;
  
  beforeEach(function() {
    event = EventBuilder.fromInteraction({type:"created_game"});
  });

  it("should always be ready", function() {
    expect(event.isReady()).toBe(true);
  });

});
