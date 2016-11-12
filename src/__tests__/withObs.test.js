import React from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {compose, withObs} from '../';

describe('withObs', () => {
  it('should merge observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Component = compose(
      withObs(() => ({foo$: baseFoo$})),
      withObs(() => ({})),
      withObs(({foo$}) => ({props$: foo$})),
    )('div');

    const wrapper = mount(<Component />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should support plain object', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Component = compose(
      withObs({foo$: baseFoo$}),
      withObs(({foo$}) => ({props$: foo$})),
    )('div');

    const wrapper = mount(<Component />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withObs({}),
      withObs({}),
      withObs({}),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withObs(withObs(withObs(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
