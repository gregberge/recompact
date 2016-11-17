import React from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {compose, mapObs, mapPropsStream} from '../';

describe('mapObs', () => {
  it('should unsubscribe props$ when unmount', () => {
    const props$ = new Rx.BehaviorSubject({});
    const propsSpy = jest.fn();
    const Div = mapPropsStream(() => props$.do(propsSpy))('div');
    const wrapper = shallow(<Div />);
    expect(propsSpy).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    props$.next({foo: 'bar'});
    expect(propsSpy).toHaveBeenCalledTimes(1);
  });

  it('should provide observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Div = compose(
      mapObs(() => ({foo$: baseFoo$})),
      mapPropsStream((props$, {foo$}) => foo$),
    )('div');

    const wrapper = mount(<Div />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should not merge observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Div = compose(
      mapObs(() => ({foo$: baseFoo$})),
      mapObs(() => ({})),
      mapObs(({foo$}) => {
        expect(foo$).toBe(undefined);
        return {};
      }),
    )('div');

    mount(<Div />);
  });

  it('should be merged with other hoc', () => {
    const Div = compose(
      mapObs(() => ({})),
      mapObs(() => ({})),
      mapObs(() => ({})),
    )('div');

    const wrapper = shallow(<Div />);
    expect(wrapper.instance().constructor.displayName).toBe('mapObs(mapObs(mapObs(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
