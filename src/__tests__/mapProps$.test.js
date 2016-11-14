import React from 'react';
import 'rxjs';
import {shallow} from 'enzyme';
import mapProps$ from '../mapProps$';

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
});
