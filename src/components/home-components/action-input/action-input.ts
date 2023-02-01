import { Block } from 'core';

interface ActionInputProps {
  placeholder?: string;
}

export class ActionInput extends Block {
  static componentName = 'ActionInput';

  constructor(props: ActionInputProps) {
    super(props)
  }

  render() {
    return `<input placeholder="{{placeholder}}" type="text" />`;
  }
}
