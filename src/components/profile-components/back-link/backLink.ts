import Block from '../../../utils/Block';
import template from './backLink.hbs'

interface BackLinkProps {
    events: {
        click: () => void;
    }
}

export class BackLink extends Block {
    constructor(props: BackLinkProps) {
        super(props)
    }

    render() {
        return this.compile(template, this.props)
    }
}
