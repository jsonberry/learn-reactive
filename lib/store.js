window['store'] = new rxjs.BehaviorSubject(null)
window['actions'] = new rxjs.Subject()
window['store']['dispatch'] = (action) => actions.next(action)