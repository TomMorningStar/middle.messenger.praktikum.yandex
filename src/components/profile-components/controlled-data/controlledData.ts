import Block from 'core/Block';

export class ControlledData extends Block {
  static componentName = 'ControlledData';

  render() {
    return `
    <div class='profile-info-flex-block'>
      <div class='profile-key'>{{key}}</div>
      <div class='profile-value'>{{value}}</div>
    </div>
    `;
  }
}
