import React from 'react';
import Rx from 'rxjs';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, mapPropsStream} from '../';

describe('mapPropsStream', () => {
  it('should emit props$.next when component receive props', () => {
    const propsSpy = jest.fn();
    const Div = mapPropsStream(props$ => props$.do(propsSpy))('div');

    const wrapper = shallow(<Div className="bar" />);

    expect(propsSpy).toHaveBeenCalledTimes(1);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'bar'});

    wrapper.setProps({className: 'foo'});

    expect(propsSpy).toHaveBeenCalledTimes(2);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'foo'});
  });

  it('should take new props from props$', () => {
    const Div = mapPropsStream(
      props$ => props$.map(({strings}) => ({className: strings.join('')})),
    )('div');

    shallow(<Div strings={['a', 'b', 'c']} />);
  });

  it('props$ should throw errors', () => {
    const props$ = new Rx.BehaviorSubject({});

    const Div = mapPropsStream(() => props$.map(() => {
      throw new Error('Too bad');
    }))('div');

    expect(() => {
      shallow(<Div />);
    }).toThrow();
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      mapPropsStream(props$ => props$.mapTo({foo: 'bar'})),
      mapPropsStream(props$ => props$),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('mapPropsStream(mapPropsStream(Dummy))');
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy();
  });
});
