import Block from "./Block";

describe('Block class', () => {
  const props = { prop1: 'value1', prop2: 'value2' };
  let block: Block<typeof props>;
  let eventBusMock: any;

  beforeEach(() => {
    eventBusMock = {
      on: jest.fn(),
      emit: jest.fn(),
    };

    block = new Block(props);
    block.eventBus = jest.fn(() => eventBusMock);
    
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create resources on init', () => {
    block.init();
    expect(block.element).not.toBeNull();
    expect(block.element?.tagName).toEqual('DIV');
  });

  it('should emit FLOW_RENDER event on init', () => {
    block.init();
    expect(block.eventBus().emit).toHaveBeenCalledWith(Block.EVENTS.FLOW_RENDER, props);
  });

  it('should trigger componentDidUnmount when component is not in the DOM', () => {
    document.body.contains = jest.fn(() => false);
    block._checkInDom();
    expect(block.eventBus().emit).toHaveBeenCalledWith(Block.EVENTS.FLOW_CWU, props);
  });

})
