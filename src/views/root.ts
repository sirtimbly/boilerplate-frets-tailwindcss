import { app } from '../app'
import { $ } from '../styles/app-styles'

export const renderRoot = (app: app) => {
  return $.div.maxWSm.mxAuto.flex.p_6.bgWhite.rounded.shadowXl.textBlue_600.m_3.h([
    `Hello ${app.modelProps.username}`
  ])
}
