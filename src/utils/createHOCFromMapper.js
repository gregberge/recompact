/* eslint-disable no-console */
import React from 'react'
import createBehaviorSubject from './createBehaviorSubject'
import createSymbol from './createSymbol'
import WeakMap from './WeakMap'
import asyncThrow from './asyncThrow'
import createEagerFactory from '../createEagerFactory'
import { getConfig } from '../setConfig'
import { config as obsConfig } from '../setObservableConfig'

const MAPPERS_INFO = createSymbol('mappersInfo')
const observablePropType = () => {}

const allMapperComponents = new WeakMap()
const setMapperComponent = Component => allMapperComponents.set(Component, true)
export const isMapperComponent = BaseComponent =>
  allMapperComponents.has(BaseComponent)

const createComponentFromMappers = (mappers, childFactory) => {
  const { observablesKey: OBSERVABLES } = getConfig()
  const CONTEXT_TYPES = { [OBSERVABLES]: observablePropType }

  const Component = class extends React.Component {
    static [MAPPERS_INFO] = { mappers, childFactory }
    static contextTypes = CONTEXT_TYPES
    static childContextTypes = CONTEXT_TYPES

    props$ = createBehaviorSubject(this.props)

    componentWillMount() {
      let childProps$ = this.props$
      let childObservables = this.context[OBSERVABLES]
      for (let i = 0; i < mappers.length; i += 1) {
        ;[childProps$, childObservables] = mappers[i](
          childProps$,
          childObservables,
        )
      }

      this.childPropsSubscription = obsConfig
        .toESObservable(childProps$)
        .subscribe({
          next: childProps => {
            this.setState({ childProps })
          },
          error: error => {
            asyncThrow(error)
            this.setState({
              childProps: this.state ? this.state.childProps : {},
            })
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
      return (
        nextState &&
        (!this.state || this.state.childProps !== nextState.childProps)
      )
    }

    render() {
      return this.state
        ? this.constructor[MAPPERS_INFO].childFactory(this.state.childProps)
        : null
    }
  }

  setMapperComponent(Component)

  return Component
}

export default mapper => BaseComponent => {
  if (isMapperComponent(BaseComponent)) {
    return createComponentFromMappers(
      [mapper, ...BaseComponent[MAPPERS_INFO].mappers],
      BaseComponent[MAPPERS_INFO].childFactory,
    )
  }

  return createComponentFromMappers([mapper], createEagerFactory(BaseComponent))
}
