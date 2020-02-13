import { LoginProps } from "./models";
import { RealWorldProps } from "~app";
import { IRegisteredField, IFunFrets } from "frets";

export function willHandle(
  f: IFunFrets<LoginProps>,
  presentGlobal: (proposal: Partial<RealWorldProps>) => void
) {
  const loginAction = f.registerAction("login", (evt, present) => {
    evt.preventDefault();
    const usernameField = f.registerField<string>("Username");
    const passField = f.registerField<string>("Password");
    usernameField.validate();
    passField.validate();
    if (!usernameField.isValid() || !passField.isValid()) {
      return;
    }
    present({
      currentAction: "login",
      accountId: usernameField.value
    });

    passField.clear();
  });
  const logoutAction = f.registerAction("logout", (evt, present) => {
    evt.preventDefault();
    present({
      currentAction: "logout"
    });
  });
  return { logoutAction, loginAction };
}
