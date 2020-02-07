import { IActionEventHandler } from "frets";
import { $ } from "~styles/app-styles";

export const LoggedIn = (props: {
  accountId: string;
  logoutAction: IActionEventHandler;
}) =>
  $.div.minWFull.p_2.h([
    $.div.h([`Hello ${props.accountId}`]),
    $.button.btn.btnBlue.mx_2.h({ onclick: props.logoutAction }, ["Logout"])
  ]);
