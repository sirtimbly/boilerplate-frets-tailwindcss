import { $, $$ } from "~styles/app-styles";
import { VNode } from "frets";
export const CenteredPanel = $$("div").maxWMd.mxAuto.flex.flexCol.itemsCenter
  .p_6.bgWhite.rounded.shadowXl.my_3;

export const successBox = (children: VNode[] | string[]) =>
  $.div.m_3.p_3.shadowLg.rounded.shadowInner.bgGreen_300.h(children);
