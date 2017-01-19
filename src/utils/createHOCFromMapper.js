/* eslint-disable no-console */
import { Component, PropTypes } from 'react'
import createBehaviorSubject from './createBehaviorSubject'
import createSymbol from './createSymbol'
import createEagerFactory from '../createEagerFactory'
import { getConfig } from '../setConfig'
import { config as obsConfig } from '../setObservableConfig'

function handleError(error) {
  try {
    throw error
  } catch (e) {
    setTimeout(() => {
      throw e
    })
  }
}

const MAPPERS_INFO = createSymbol('mappersInfo')

const createComponentFromMappers = (mappers, childFactory) => {
  const { observablesKey: OBSERVABLES } = getConfig()
  const CONTEXT_TYPES = { [OBSERVABLES]: PropTypes.object }

  return class extends Component {
    static [MAPPERS_INFO] = { mappers, childFactory };
    static contextTypes = CONTEXT_TYPES;
    static childContextTypes = CONTEXT_TYPES;

    props$ = createBehaviorSubject(this.props);

    componentWillMount() {
      const [childProps$, childObservables] =
        mappers.reduce(
          ([props$, obs], mapper) => mapper(props$, obs),
          [this.props$, this.context[OBSERVABLES]],
        )

      this.childPropsSubscription = obsConfig.toESObservable(childProps$).subscribe({
        next: childProps => this.setState({ childProps }),
        error: (error) => {
          handleError(error)
          this.setState({ childProps: this.state ? this.state.childProps : {} })
        },
      })

      this.childContext = { [OBSERVABLES]: childObservables }
    }

    getChildContext() {
      return this.childContext
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps)
    }

    componentWillUnmount() {
      this.childPropsSubscription.unsubscribe()
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState && (
        !this.state || this.state.childProps !== nextState.childProps
      )
    }

    render() {
      if (!this.state) {
        return null
      }

      return this.constructor[MAPPERS_INFO].childFactory(this.state.childProps)
    }
  }
}

export const isMapperComponent = BaseComponent =>
  typeof BaseComponent === 'function' && MAPPERS_INFO in BaseComponent

export default mapper => (BaseComponent) => {
  if (isMapperComponent(BaseComponent)) {
    return createComponentFromMappers(
      [mapper, ...BaseComponent[MAPPERS_INFO].mappers],
      BaseComponent[MAPPERS_INFO].childFactory,
    )
  }

  return createComponentFromMappers(
    [mapper],
    createEagerFactory(BaseComponent),
  )
}
