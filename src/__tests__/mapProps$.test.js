import React from 'react';
import 'rxjs';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, mapProps$} from '../';

describe('mapProps$', () => {
  it('should emit props$.next when component receive props', () => {
    const propsSpy = jest.fn();
    const Div = mapProps$(props$ => props$.do(propsSpy))('div');

    const wrapper = shallow(<Div className="bar" />);

    expect(propsSpy).toHaveBeenCalledTimes(1);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'bar'});

    wrapper.setProps({className: 'foo'});

    expect(propsSpy).toHaveBeenCalledTimes(2);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'foo'});
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      mapProps$(props$ => props$.mapTo({foo: 'bar'})),
      mapProps$(props$ => props$),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('mapProps$(mapProps$(Dummy))');
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy();
  });
});
