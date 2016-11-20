import React from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {compose, mapContextObs, mapProps$} from '../';

describe('mapContextObs', () => {
  it('should provide observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Div = compose(
      mapContextObs(() => ({foo$: baseFoo$})),
      mapProps$((props$, {foo$}) => foo$),
    )('div');

    const wrapper = mount(<Div />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should not merge observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Div = compose(
      mapContextObs(() => ({foo$: baseFoo$})),
      mapContextObs(() => ({})),
      mapContextObs(({foo$}) => {
        expect(foo$).toBe(undefined);
        return {};
      }),
    )('div');

    mount(<Div />);
  });

  it('should be merged with other hoc', () => {
    const Div = compose(
      mapContextObs(() => ({})),
      mapContextObs(() => ({})),
      mapContextObs(() => ({})),
    )('div');

    const wrapper = shallow(<Div />);
    expect(wrapper.instance().constructor.displayName).toBe('mapContextObs(mapContextObs(mapContextObs(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
