import createObservable from '../../utils/createObservable'
import shareObservable from '../../utils/shareObservable'

describe('shareObservable', () => {
  it('should share observable', () => {
    let count = 0

    const observable = createObservable(observer => {
      count += 1
      observer.next(count)
      return { unsubscribe: jest.fn() }
    })

    const sharedObservable = shareObservable(observable)
    const observer1 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    const observer2 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    sharedObservable.subscribe(observer1)
    sharedObservable.subscribe(observer2)
    expect(observer1.next).toHaveBeenCalledTimes(1)
    expect(observer1.next).toHaveBeenCalledWith(1)
    expect(observer2.next).toHaveBeenCalledTimes(1)
    expect(observer2.next).toHaveBeenCalledWith(1)
  })

  it('should subscribe at first subscription', () => {
    const subscriber = jest.fn(() => ({ unsubscribe: jest.fn() }))
    const observable = createObservable(subscriber)
    const sharedObservable = shareObservable(observable)
    const observer1 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    expect(subscriber).not.toHaveBeenCalled()
    sharedObservable.subscribe(observer1)
    expect(subscriber).toHaveBeenCalled()
  })

  it('should unsubscribe when there is no subscriber left', () => {
    const unsubscribe = jest.fn()
    const observable = createObservable(jest.fn(() => ({ unsubscribe })))
    const sharedObservable = shareObservable(observable)
    const observer = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    const subscription1 = sharedObservable.subscribe(observer)
    const subscription2 = sharedObservable.subscribe(observer)
    expect(unsubscribe).not.toHaveBeenCalled()
    subscription1.unsubscribe()
    expect(unsubscribe).not.toHaveBeenCalled()
    subscription2.unsubscribe()
    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('should forward complete', () => {
    let observer
    const observable = createObservable(_observer => {
      observer = _observer
      return { unsubscribe: jest.fn() }
    })

    const sharedObservable = shareObservable(observable)
    const observer1 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    const observer2 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    sharedObservable.subscribe(observer1)
    sharedObservable.subscribe(observer2)
    observer.complete('done')
    expect(observer1.complete).toHaveBeenCalledTimes(1)
    expect(observer1.complete).toHaveBeenCalledWith('done')
    expect(observer2.complete).toHaveBeenCalledTimes(1)
    expect(observer2.complete).toHaveBeenCalledWith('done')
  })

  it('should forward error', () => {
    let observer
    const observable = createObservable(_observer => {
      observer = _observer
      return { unsubscribe: jest.fn() }
    })

    const sharedObservable = shareObservable(observable)
    const observer1 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    const observer2 = { next: jest.fn(), complete: jest.fn(), error: jest.fn() }
    sharedObservable.subscribe(observer1)
    sharedObservable.subscribe(observer2)
    observer.error('error')
    expect(observer1.error).toHaveBeenCalledTimes(1)
    expect(observer1.error).toHaveBeenCalledWith('error')
    expect(observer2.error).toHaveBeenCalledTimes(1)
    expect(observer2.error).toHaveBeenCalledWith('error')
  })
})
