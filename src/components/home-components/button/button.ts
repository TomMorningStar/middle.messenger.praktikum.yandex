import { Block, Store } from 'core';
import { deleteUserInChat } from 'services/chat';
import { withStore } from 'utils';

interface ButtonProps {
    id: string,
    store: Store<AppState>
}

class Button extends Block {
    static componentName = 'Button';

    constructor({ id, store }: ButtonProps) {
        super({
            id, store, events: {
                click: () => {
                    this.props.store.dispatch(deleteUserInChat, id);
                }
            }
        });
    }

    render() {
        return `<button class="delete-button">x</button>`;
    }
}

const UpdateButton = withStore(Button);

export { UpdateButton as Button };
