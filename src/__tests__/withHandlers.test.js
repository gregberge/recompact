import React from 'react';
import sinon from 'sinon';
import {mount, shallow} from 'enzyme';
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

  it('allows handers to be a factory', () => {
    const enhance = withHandlers((initialProps) => {
      let cache;

      return {
        handler: () => () => {
          if (cache) {
            return cache;
          }

          cache = {...initialProps};

          return cache;
        },
      };
    });

    const componentHandlers = [];
    const componentHandlers2 = [];

    const Component = enhance(({handler}) => {
      componentHandlers.push(handler());
      return null;
    });

    const Component2 = enhance(({handler}) => {
      componentHandlers2.push(handler());
      return null;
    });

    const wrapper = mount(<Component hello={'foo'} />);
    wrapper.setProps({hello: 'bar'});
    expect(componentHandlers[0]).toBe(componentHandlers[1]);

    // check that cache is not shared
    mount(<Component2 hello={'foo'} />);
    expect(componentHandlers[0]).toEqual(componentHandlers2[0]);
    expect(componentHandlers[0]).not.toBe(componentHandlers2[0]);
  });
});
