import React, {Component, PropTypes} from 'react';
import {mount, shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, getContext, mapProps, withContext} from '../';

describe('getContext', () => {
  it('should get context and put it in props', () => {
    const DummyFoo = compose(
      BaseComponent => class extends Component {
        static childContextTypes = {
          foo: PropTypes.string.isRequired,
        };

        getChildContext() {
          return {foo: 'bar'};
        }

        render() {
          return <BaseComponent {...this.props} />;
        }
      },
      getContext({foo: PropTypes.string.isRequired}),
    )(Dummy);

    const wrapper = mount(<DummyFoo bar="foo" />);

    expect(wrapper.find(Dummy).props()).toEqual({bar: 'foo', foo: 'bar'});
  });

  it('should be merged with other hoc', () => {
    const Div = compose(
      withContext({foo: PropTypes.string.isRequired}, () => ({foo: 'bar'})),
      getContext({foo: PropTypes.string.isRequired}),
      mapProps(({foo}) => ({className: foo})),
    )('div');

    const wrapper = shallow(<Div />);
    expect(wrapper.instance().constructor.displayName).toBe('withContext(getContext(mapProps(div)))');
    expect(wrapper.equals(<div className="bar" />)).toBeTruthy();
  });
});
