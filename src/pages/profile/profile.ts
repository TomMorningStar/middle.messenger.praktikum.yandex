import { Block, PathRouter, Store } from 'core';
import { withUser, withStore, withRouter, Screens } from 'utils';

interface ProfileProps {
  router: PathRouter;
  store: Store<AppState>;
  user: User;

  profileData: Boolean;
  changeData: Boolean;
  changePassword: Boolean;

  onBackPage: () => void;
  goChangeDataPage: () => void;
  goChangePasswordPage: () => void;
}

class Profile extends Block {
  static componentName = 'ProfilePage';

  constructor(props: ProfileProps) {
    super(props);

    this.setProps({
      profileData: true,
      changeData: false,
      changePassword: false,

      onBackPage: () => this.onBackPage(),
      goChangeDataPage: () => this.goChangeDataPage(),
      goChangePasswordPage: () => this.goChangePasswordPage(),
    });
  }


  goChangeDataPage() {
    this.setProps({
      profileData: false,
      changeData: true,
      changePassword: false,
    })
  }

  goChangePasswordPage() {
    this.setProps({
      profileData: false,
      changeData: false,
      changePassword: true,
    })
  }

  onBackPage() {
    if (this.props.changeData || this.props.changePassword) {
      this.setProps({
        profileData: true,
        changeData: false,
        changePassword: false,
      });
    } else {
      this.props.router.go('/')
    }
  }

  componentDidUpdate() {
    return window.store.getState().screen === Screens.Profile
  }

  render() {
    const avatar = this.props.user.avatar;

    return `
        <main class='profle-page-wrapper'>
          {{{BackLink onBackPage=onBackPage}}}
          <div class='info-profile-wrapper-block'>
            {{#if profileData}}
              {{#if user.avatar}}
                <div class='profile-avatar' style="background-image: url(https://ya-praktikum.tech/api/v2/resources/${avatar})"></div>
              {{else}}
                <div class='profile-avatar'></div>
              {{/if}}   
            {{/if}}

          {{#if profileData}}
              {{{ProfileData 
                user=user
                ref="profileData"
                goChangeDataPage=goChangeDataPage
                goChangePasswordPage=goChangePasswordPage
              }}}
          {{/if}}
    
          {{#if changeData}}
              {{{ChangeData style="screen_loading" onBackPage=onBackPage router=router store=store ref="changeData" user=user}}}
          {{/if}}

          {{#if changePassword}}
              {{{ChangePassword user=user ref="changePassword" onBackPage=onBackPage error=error}}}
          {{/if}}
          
          </div>
        </main>`;
  }
}


export default withRouter(withStore(withUser(Profile)));

















