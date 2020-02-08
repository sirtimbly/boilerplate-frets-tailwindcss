import { $$, $ } from "~styles/app-styles";
import { IRegisteredField, IActionEventHandler, VNode } from "frets";
import { textInput } from "~components/input";

export const TextFieldForm = (props: {
  textFields: IRegisteredField<string>[];
  loginLabel: string;
  loginAction: IActionEventHandler;
  children?: VNode[];
}) =>
  $$("form").itemsCenter.flex.flexCol.minWFull.itemsStretch.h([
    ...props.textFields.map(textInput),
    ...(props.children || []),
    $.button.mt_2.btn.btnBlue.h(
      {
        onclick: props.loginAction,
        disabled: Boolean(
          props.textFields.find(x => !x.value || !x.isDirty() || !x.isValid())
        )
      },
      [props.loginLabel]
    )
  ]);
