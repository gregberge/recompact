import React from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {compose, setObservableConfig, withObs} from '../';
import rxjsObservableConfig from '../rxjsObservableConfig';

describe('withObs', () => {
  beforeEach(() => {
    setObservableConfig(rxjsObservableConfig);
  });

  afterEach(() => {
    setObservableConfig({
      toESObservable: undefined,
      fromESObservable: undefined,
    });
  });

  it('should merge observables and map props$', () => {
    const baseFoo$ = Rx.Observable.of('foo');
    const Component = compose(
      withObs(() => ({foo$: baseFoo$})),
      withObs(() => ({})),
      withObs(({props$, foo$}) => ({
        props$: props$.combineLatest(foo$, (_, foo) => ({className: foo})),
      })),
    )('div');

    const wrapper = mount(<Component />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withObs(() => ({})),
      withObs(() => ({})),
      withObs(() => ({})),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withObs(withObs(withObs(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
