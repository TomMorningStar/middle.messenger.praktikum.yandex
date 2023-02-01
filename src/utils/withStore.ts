import { BlockClass, Store } from 'core';

type WithStateProps = { store: Store<AppState> };

// withStore<UserTitleProps, {firstName?: string} UserTitle, (state: AppState) => ({
//   firstName: state.user?.firstName
// })

type MapStateToProps<MappedPorps> = (state: AppState) => MappedPorps

export function withStore<P extends WithStateProps, MappedPorps = any>(WrappedBlock: BlockClass<P>, mapStateToProps?: MapStateToProps<MappedPorps>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
      // super({ ...props, ...mapStateToProps(window.store.getState()) });
    }

    __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {

      if (typeof mapStateToProps === 'function') {
        const prevPropsFromState = mapStateToProps(prevState); // <-- {firstName: "Emma"}
        const nextPropsFromState = mapStateToProps(nextState); // <-- {firstName: "John"}

        if ( JSON.stringify(prevPropsFromState) !==  JSON.stringify(nextPropsFromState)) {
          // @ts-expect-error this is not typed
          this.setProps(nextPropsFromState);

        }

        return
      }
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }

  } as BlockClass<Omit<P, 'store'>>;
}
