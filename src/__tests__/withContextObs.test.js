import React from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {compose, withContextObs, mapProps$} from '../';

describe('withContextObs', () => {
  it('should merge observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Component = compose(
      withContextObs(() => ({foo$: baseFoo$})),
      withContextObs(() => ({})),
      mapProps$((props$, {foo$}) => foo$),
    )('div');

    const wrapper = mount(<Component />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should support plain object', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Component = compose(
      withContextObs({foo$: baseFoo$}),
      mapProps$((props$, {foo$}) => foo$),
    )('div');

    const wrapper = mount(<Component />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withContextObs({}),
      withContextObs({}),
      withContextObs({}),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withContextObs(withContextObs(withContextObs(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
