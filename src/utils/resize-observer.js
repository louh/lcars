let ro

export function setupResizeObserver () {
  // ResizeObserver helper
  // See: https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/#observing-container-resizes
  // Only run if ResizeObserver is supported.
  if ('ResizeObserver' in self) {
    // Create a single ResizeObserver instance to handle all
    // container elements. The instance is created with a callback,
    // which is invoked as soon as an element is observed as well
    // as any time that element's size changes.
    ro = new ResizeObserver(function(entries) {
      // Default breakpoints that should apply to all observed
      // elements that don't define their own custom breakpoints.
      const defaultBreakpoints = {SM: 384, MD: 576, LG: 768, XL: 960}

      entries.forEach(function(entry) {
        // If breakpoints are defined on the observed element,
        // use them. Otherwise use the defaults.
        const breakpoints = entry.target.dataset.breakpoints ?
            JSON.parse(entry.target.dataset.breakpoints) :
            defaultBreakpoints

        // Update the matching breakpoints on the observed element.
        Object.keys(breakpoints).forEach(function(breakpoint) {
          const minWidth = breakpoints[breakpoint]
          if (entry.contentRect.width >= minWidth) {
            entry.target.classList.add(breakpoint)
          } else {
            entry.target.classList.remove(breakpoint)
          }
        })
      })
    })
  }
}

export function startResizeObserver () {
  // Find all elements with the `data-observe-resizes` attribute
  // and start observing them.
  const elements = document.querySelectorAll('[data-observe-resizes]')
  for (let element, i = 0; element = elements[i]; i++) {
    ro.observe(element)
  }
}
