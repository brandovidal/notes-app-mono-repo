import React, { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

import i18n from '../../i18n'

const Toggable = forwardRef(({ children = '', buttonLabel = 'Mostrar' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <div>
          <button onClick={toggleVisibility}>{i18n.TOGGABLE.CANCEL_BUTTON}</button>
        </div>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  buttonLabel: propTypes.string,
  children: propTypes.node
}

export default Toggable
