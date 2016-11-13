import React, {Component, PropTypes} from 'react';
import getContext from 'recompose/getContext';
import {mount, shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, mapProps, withContext, withProps} from '../';

describe('withContext', () => {
  it('should add context', () => {
    // Mini React Redux clone
    const store = {
      getState: () => ({
        todos: ['eat', 'drink', 'sleep'],
        counter: 12,
      }),
    };

    class BaseProvider extends Component {
      static propTypes = {
        children: PropTypes.node,
      };

      render() {
        return this.props.children;
      }
    }

    const Provider = compose(
      withContext(
        {store: PropTypes.object},
        props => ({store: props.store}),
      ),
    )(BaseProvider);

    expect(Provider.displayName).toBe('withContext(BaseProvider)');

    const connect = selector => compose(
      getContext({store: PropTypes.object}),
      mapProps(props => selector(props.store.getState())),
    );

    const TodoList = connect(({todos}) => ({todos}))(Dummy);

    expect(TodoList.displayName).toBe('getContext(mapProps(Dummy))');

    const dummy = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    ).find(Dummy);

    expect(dummy.prop('todos')).toEqual(['eat', 'drink', 'sleep']);
  });

  it('should be merged with other hoc', () => {
    const Div = compose(
      withContext({}, () => ({})),
      withProps({className: 'foo'}),
    )('div');

    const wrapper = shallow(<Div />);
    expect(wrapper.instance().constructor.displayName).toBe('withContext(withProps(div))');
    expect(wrapper.equals(<div className="foo" />)).toBeTruthy();
  });
});
