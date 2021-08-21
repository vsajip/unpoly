const u = up.util
const $ = jQuery

describe('up.browser', function() {
  
  describe('JavaScript functions', function() {

    describe('up.browser.isSupported', function() {

      it('returns true on a supported browser', function() {
        expect(up.browser.isSupported()).toBe(true)
      })

      it('returns false if window.Promise is missing', function() {
        // Cannot use spyOnProperty() for window.Promise, as window does not return a property descriptor.
        let oldPromise = window.Promise
        try {
          window.Promise = undefined
          expect(up.browser.isSupported()).toBe(false)
       } finally {
          window.Promise = oldPromise
        }
      })

      it('returns false if the document is missing a DOCTYPE, triggering quirks mode', function() {
        // Cannot use spyOnProperty() for document.compatMode, as document does not return a property descriptor.
        let oldCompatMode = document.compatMode
        try {
          // Quirks mode is "BackCompat". Standards mode is "CSS1Compat".
          Object.defineProperty(document, 'compatMode', { value: 'BackCompat' })
          expect(up.browser.isSupported()).toBe(false)
        } finally {
          document.compatMode = oldCompatMode
        }
      })

    })

    describe('up.browser.assertConfirmed', function() {

      it('shows a confirmation dialog with the given message', function() {
        spyOn(window, 'confirm').and.returnValue(true)
        up.browser.assertConfirmed({confirm: 'Do action?'})
        expect(window.confirm).toHaveBeenCalledWith('Do action?')
      })

      it('throws an AbortError when any listener calls event.preventDefault()', function() {
        spyOn(window, 'confirm').and.returnValue(false)
        const call = () => up.browser.assertConfirmed({confirm: 'Do action?'})
        expect(call).toAbort()
      })

      it('does now show a conformation dialog and fulfills if no { confirm } option is given', function() {
        spyOn(window, 'confirm')
        up.browser.assertConfirmed({})
        expect(window.confirm).not.toHaveBeenCalled()
      })
    })

    describe('up.browser.popCookie', function() {

      it('returns the value of the given cookie', function() {
        document.cookie = 'key=value'
        expect(up.browser.popCookie('key')).toEqual('value')
      })

      it('deletes the given cookie', function() {
        document.cookie = 'key=value'
        up.browser.popCookie('key')
        expect(document.cookie).not.toContain('key=Value')
      })
    })
  })
})
