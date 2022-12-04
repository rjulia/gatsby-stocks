import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18next from '../i18n/config'

const wrapRootElement = (props) => (
  <I18nextProvider i18n={i18next}>
  

      {props.element}
   
  </I18nextProvider>
)

export default wrapRootElement