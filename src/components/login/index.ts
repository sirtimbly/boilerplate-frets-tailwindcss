import { IMountable, setup, VNode } from "frets/src";
import { RealWorldProps } from "../../app";
import { LoginProps, willAccept } from "./models";
import { willMutate } from "./state";
import { willHandle } from "./actions";
import { LoggedIn } from "./_loggedIn";
import { TextFieldForm } from "../TextFieldForm";
import { CenteredPanel } from "../CenteredPanel";
import { PassiveText } from "../PassiveText";
import { ErrorMsg } from "~components/error";

enum States {
  loggedIn = "loggedIn",
  loading = "loading",
  loggedOut = "loggedOut"
}

interface IViewStates {
  loggedIn: VNode;
  loading: VNode;
  loggedOut: VNode;
}

export default function loginComponent(
  presentGlobal: (proposal: Partial<RealWorldProps>) => void,
  projector
): IMountable<LoginProps> {
  console.log("initializing a new login component");
  const init = new LoginProps();
  return setup(
    init,
    f => {
      console.log("setting up a new login component");
      willAccept(f);

      f.registerView(({ modelProps }) => {
        console.log("rendering login view", modelProps);
        const { accountId, loading, error, logout } = modelProps;
        const { usernameField, passField } = willMutate(f);
        const { logoutAction, loginAction } = willHandle(
          f,
          usernameField,
          passField,
          presentGlobal
        );
        const possibleViewStates: IViewStates = {
          loggedIn: LoggedIn({ accountId, logoutAction }),
          loading: PassiveText.h([`Logging ${logout ? "Out" : "In"}...`]),
          loggedOut: TextFieldForm({
            textFields: [usernameField, passField],
            loginAction,
            loginLabel: "Engage"
          })
        };
        const currentViewState = !!accountId
          ? States.loggedIn
          : !!loading
          ? States.loading
          : States.loggedOut;
        return CenteredPanel.h([
          ErrorMsg(error),
          possibleViewStates[currentViewState]
        ]);
      });
    },
    {
      projector
    }
  );
}
