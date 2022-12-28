import Block from 'utils/Block';

interface ProProfileDataProps {
  title: string;
  data: {
    key: string;
    value: string;
  }[];
}

export class ProfileData extends Block {
  static componentName = 'ProfileData';

  constructor({ title, data }: ProProfileDataProps) {
    super({ title, data });
  }

  render() {
    return `
    <div>
        <div>
            <h3>{{title}}</h3>
        </div>
        <div class='profile-info-block'>
            ${
              this.props.data
                ? this.props.data
                    .map((item) => {
                      return `{{{ControlledData key="${item.key}" value="${item.value}"}}}`;
                    })
                    .join('')
                : ''
            }
        </div>
    </div>
    
    `;
  }
}
