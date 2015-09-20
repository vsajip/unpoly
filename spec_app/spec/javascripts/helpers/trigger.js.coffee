@Trigger = (->
  
  u = up.util
  
  mousedown = ($element, options) ->
    event = createMouseEvent('mousedown', options)
    dispatch($element, event)
  
  mouseup = ($element, options) ->
    event = createMouseEvent('mouseup', options)
    dispatch($element, event)
    
  click = ($element, options) ->
    event = createMouseEvent('click', options)
    dispatch($element, event)

  # Can't use the new MouseEvent constructor in IE11 because computer.
  # http://www.codeproject.com/Tips/893254/JavaScript-Triggering-Event-Manually-in-Internet-E
  createMouseEvent = (type, options) ->
    options = u.options(options,
      view: window,
      cancelable: true,
      bubbles: true,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null
    )
    event = document.createEvent('MouseEvent')
    event.initMouseEvent(type,
      options.bubbles,
      options.cancelable,
      options.view,
      options.detail,
      options.screenX,
      options.screenY,
      options.clientX,
      options.clientY,
      options.ctrlKey,
      options.altKey,
      options.shiftKey,
      options.metaKey,
      options.button,
      options.relatedTarget
    )
    event

  dispatch = ($element, event) ->
    $element.each ->
      this.dispatchEvent(event)
      
  mousedown: mousedown
  mouseup: mouseup
  click: click
  
)()
