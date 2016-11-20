import React from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {Dummy} from './utils';
import {connectObs, compose, withContextObs} from '../';

describe('connectObs', () => {
  it('should connect observables to props', () => {
    const baseClassName$ = new Rx.BehaviorSubject('foo');
    const Component = compose(
      withContextObs({className$: baseClassName$}),
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
      withContextObs({change$: baseChange$}),
      connectObs(({change$}) => ({onChange: change$})),
    )('input');

    const wrapper = mount(<Component />);
    expect(changeSpy).not.toHaveBeenCalled();

    wrapper.find('input').prop('onChange')('foo');
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenLastCalledWith('foo');
  });

  it('should receive props$', () => {
    const Component = compose(
      connectObs((_, props$) => ({className: props$.pluck('foo')})),
    )(Dummy);

    const wrapper = mount(<Component foo="bar" />);
    expect(wrapper.find(Dummy).prop('className')).toBe('bar');

    wrapper.setProps({foo: 'foo'});

    expect(wrapper.find(Dummy).prop('className')).toBe('foo');
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withContextObs({className$: Rx.Observable.of('foo')}),
      connectObs(({className$}) => ({className: className$})),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withContextObs(connectObs(div))');
    expect(wrapper.equals(<div className="foo" />)).toBeTruthy();
  });
});
