import { Component } from 'react'
import createSubject from './utils/createSubject'
import { config as globalConfig } from './setObservableConfig'

export const componentFromStreamWithConfig = config => propsToVdom =>
  class ComponentFromStream extends Component {
    state = { vdom: null };

    // Stream of props
    props$ = createSubject()

    // Stream of vdom
    vdom$ = config.toESObservable(propsToVdom(this.props$));

    componentWillMount() {
      // Subscribe to child prop changes so we know when to re-render
      this.subscription = this.vdom$.subscribe({
        next: (vdom) => {
          this.setState({ vdom })
        },
      })
      this.props$.next(this.props)
    }

    componentWillReceiveProps(nextProps) {
      // Receive new props from the owner
      this.props$.next(nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.vdom !== this.state.vdom
    }

    componentWillUnmount() {
      // Clean-up subscription before un-mounting
      this.subscription.unsubscribe()
    }

    render() {
      return this.state.vdom
    }
  }

const componentFromStream = componentFromStreamWithConfig(globalConfig)

export default componentFromStream
