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
      willMutate(f);
      const { logoutAction, loginAction } = willHandle(f, presentGlobal);
      f.registerStateGraph({
        name: "loggedOut",
        edges: [
          {
            name: "loading",
            guard: props => props.loading,
            renderer: app =>
              PassiveText.h([
                `Logging ${app.modelProps.logout ? "Out" : "In"}...`
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

      f.registerView(app => {
        console.log("rendering login view", app.modelProps);
        const { error } = app.modelProps;
        return CenteredPanel.h([
          ErrorMsg(error),
          app.currentStateNode.renderer(app)
        ]);
      });
    },
    {
      projector
    }
  );
}
