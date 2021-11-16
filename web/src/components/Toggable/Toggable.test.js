import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Toggable from './Toggable'
import i18n from '../../i18n'

describe('<Toggable />', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div>testDivContainer</div>
      </Toggable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDivContainer')
  })

  test('renders its children but they are not visible', () => {
    const el = component.getByText('testDivContainer')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDivContainer')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDivContainer')
    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
    fireEvent.click(cancelButton)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})
