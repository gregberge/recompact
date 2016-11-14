import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {withHandlers} from '../';

describe('withHandlers', () => {
  it('passes immutable handlers', () => {
    const enhance = withHandlers({
      handler: () => () => null,
    });
    const EnhancedDummy = enhance(Dummy);
    expect(EnhancedDummy.displayName).toBe('withHandlers(Dummy)');

    const wrapper = shallow(<EnhancedDummy />);
    const handler = wrapper.prop('handler');

    wrapper.setProps({foo: 'bar'});
    expect(wrapper.prop('foo')).toBe('bar');
    expect(wrapper.prop('handler')).toBe(handler);
  });

  it('caches handlers properly', () => {
    const handlerCreationSpy = sinon.spy();
    const handlerCallSpy = sinon.spy();

    const enhance = withHandlers({
      handler: (props) => {
        handlerCreationSpy(props);
        return (val) => {
          handlerCallSpy(val);
        };
      },
    });
    const EnhancedDummy = enhance(Dummy);

    const wrapper = shallow(<EnhancedDummy foo="bar" />);
    const handler = wrapper.prop('handler');

    // Don't create handler until it is called.
    expect(handlerCreationSpy.callCount).toEqual(0);
    expect(handlerCallSpy.callCount).toEqual(0);

    handler(1);
    expect(handlerCreationSpy.callCount).toEqual(1);
    expect(handlerCreationSpy.args[0]).toEqual([{foo: 'bar'}]);
    expect(handlerCallSpy.callCount).toEqual(1);
    expect(handlerCallSpy.args[0]).toEqual([1]);

    // Props haven't changed; should use cached handler.
    handler(2);
    expect(handlerCreationSpy.callCount).toEqual(1);
    expect(handlerCallSpy.callCount).toEqual(2);
    expect(handlerCallSpy.args[1]).toEqual([2]);

    wrapper.setProps({foo: 'baz'});
    handler(3);

    // Props did change; handler should be recreated.
    expect(handlerCreationSpy.callCount).toEqual(2);
    expect(handlerCreationSpy.args[1]).toEqual([{foo: 'baz'}]);
    expect(handlerCallSpy.callCount).toEqual(3);
    expect(handlerCallSpy.args[2]).toEqual([3]);
  });

  it('throws if handler is not a higher-order function', () => {
    const EnhancedDummy = withHandlers({
      foo: () => {},
    })(Dummy);

    const wrapper = shallow(<EnhancedDummy />);

    expect(() => wrapper.prop('foo').call()).toThrowError(
      'withHandlers(): Expected a map of higher-order functions.',
    );
  });
});
