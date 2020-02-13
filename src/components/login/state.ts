import {
  PropsWithFields,
  IFunFrets,
  IRegisteredField,
  IActionEventHandler
} from "frets";
import { LoginProps } from "./models";
import { PassiveText } from "../PassiveText";
import { LoggedIn } from "./_loggedIn";
import { TextFieldForm } from "../TextFieldForm";

export const willMutate = (f: IFunFrets<LoginProps>) => ({
  usernameField: f.registerField("Username", f.modelProps.accountId, {
    notEmpty: {
      value: true,
      message: "Username cannot be empty"
    }
  }),
  passField: f.registerField("Password", "", {
    notEmpty: {
      value: true,
      message: "Password cannot be empty"
    },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    }
  })
});

export function willUseStateGraph(
  f: IFunFrets<LoginProps>,
  logoutAction: IActionEventHandler,
  loginAction: IActionEventHandler
) {
  f.registerStateGraph({
    name: "loggedOut",
    edges: [
      {
        name: "loading",
        guard: props => props.loading,
        renderer: app =>
          PassiveText.h([
            `Logging ${
              app.modelProps.currentAction === "logout" ? "Out" : "In"
            }...`
          ])
      },
      {
        name: "loggedIn",
        guard: props => Boolean(props.accountId),
        renderer: app =>
          LoggedIn({ accountId: app.modelProps.accountId, logoutAction })
      }
    ],
    renderer: app =>
      TextFieldForm({
        textFields: [
          app.registerField("Username"),
          app.registerField("Password")
        ],
        loginAction,
        loginLabel: "Log In"
      })
  });
}
