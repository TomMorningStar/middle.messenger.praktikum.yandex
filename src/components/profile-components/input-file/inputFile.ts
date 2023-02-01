import { Block } from 'core';

interface InputFileProps {
    onChangeUserAvatar: () => void
}

export class InputFile extends Block {
  static componentName = 'InputFile';

  constructor(props: InputFileProps) {
    super(props);
  }
  
  render() {
    return `<input type="file" multiple />`;
  }
}
