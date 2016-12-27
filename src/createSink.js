import { Component } from 'react'

/**
 * Creates a component that renders nothing (null) but calls a callback when
 * receiving new props.
 *
 * @static
 * @category Utilities
 * @param {Function} callback Function called when new props are received.
 * @returns {ReactClass} Returns a ReactClass.
 * @example
 *
 * const LocationUpdater = createSink(({hash}) => {
 *   window.location.hash = hash;
 * });
 * <LocationUpdater hash="foo" /> // Will add "#foo" in the url
 */
const createSink = callback =>
  class Sink extends Component {
    componentWillMount() {
      callback(this.props)
    }

    componentWillReceiveProps(nextProps) {
      callback(nextProps)
    }

    render() {
      return null
    }
  }

export default createSink
