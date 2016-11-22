import React, {Component, PropTypes} from 'react';
import {mount} from 'enzyme';
import Rx from 'rxjs';
import {setConfig, withContextObs} from '../';

describe('setConfig', () => {
  it('should be possible to specify an observablesKey', () => {
    const spy = jest.fn();
    setConfig({observablesKey: 'myObsKey'});

    const observables = {foo$: Rx.Observable.of('foo')};

    const ContextComponent = withContextObs(observables)(
      class extends Component {
        static contextTypes = {
          myObsKey: PropTypes.object,
        };

        render() {
          spy(this.context);
          return null;
        }
      },
    );

    mount(<ContextComponent />);

    expect(spy.mock.calls[0][0]).toEqual({
      myObsKey: observables,
    });
  });
});
