import { expect } from 'chai';
import { spy } from 'sinon';
import externalLinks from './externalLinks';
import history from '../history';

describe('externalLinks', () => {
  const historyPush = spy(history, 'push');
  const ipc = {
    on: spy(),
  };

  it('calling init when ipc is not on window should do nothing', () => {
    window.ipc = null;
    externalLinks.init();
    expect(ipc.on).to.not.have.been.calledWith();
  });

  it('calling init when ipc is available on window should bind listeners', () => {
    window.ipc = ipc;
    externalLinks.init();
    expect(ipc.on).to.have.been.calledWith();
  });

  it('opens url', () => {
    const callbacks = {};
    window.ipc = {
      on: (event, callback) => { callbacks[event] = callback; },
    };
    externalLinks.init();
    callbacks.openUrl({}, 'lisk://register');
    expect(historyPush).to.have.been.calledWith('/register');
  });
});
