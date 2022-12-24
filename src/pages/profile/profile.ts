import BackLink from "../../components/profile-components/back-link";
import Block from "../../utils/Block";
import { router } from "../../utils/router";
import template from './profile.hbs'


export class Profile extends Block {

    protected initChildren(): void {
        this.children.backLink = new BackLink({
            events: {
                click: () => router('home')
            }
        })
    }


    render() {
       return  this.compile(template, {})
    }
}