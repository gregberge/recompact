import React from 'react';
import Rx from 'rxjs';
import compose from 'recompose/compose';
import {mount, shallow} from 'enzyme';
import withObs from '../withObs';
import connectObs from '../connectObs';

describe('connectObs', () => {
  it('should connect observables to props', () => {
    const baseClassName$ = new Rx.BehaviorSubject('foo');
    const Component = compose(
      withObs({className$: baseClassName$}),
      connectObs(({className$}) => ({className: className$})),
    )('div');

    const wrapper = mount(<Component />);
    expect(wrapper.find('div').prop('className')).toBe('foo');

    baseClassName$.next('bar');

    expect(wrapper.find('div').prop('className')).toBe('bar');
  });

  it('should connect observer to props', () => {
    const baseChange$ = new Rx.Subject();
    const changeSpy = jest.fn();
    baseChange$.subscribe(changeSpy);

    const Component = compose(
      withObs({change$: baseChange$}),
      connectObs(({change$}) => ({onChange: change$})),
    )('input');

    const wrapper = mount(<Component />);
    expect(changeSpy).not.toHaveBeenCalled();

    wrapper.find('input').prop('onChange')('foo');
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenLastCalledWith('foo');
  });

  it('should merge hoc', () => {
    const Component = compose(
      withObs({className$: Rx.Observable.of('foo')}),
      connectObs(({className$}) => ({className: className$})),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withObs(connectObs(div))');
    expect(wrapper.equals(<div className="foo" />)).toBeTruthy();
  });
});
