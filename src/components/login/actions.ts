import { LoginProps } from "./state";
import { RealWorldProps } from "~app";
import { IRegisteredField } from "frets";

export function willHandle(
  f: import("/Users/tim/Sites/frets/build/main/Frets").IFunFrets<LoginProps>,
  usernameField: IRegisteredField<string>,
  passField: IRegisteredField<string>,
  presentGlobal: (proposal: Partial<RealWorldProps>) => void
) {
  const loginAction = f.registerAction("login", (evt, present) => {
    evt.preventDefault();
    usernameField.validate();
    passField.validate();
    if (!usernameField.isValid() || !passField.isValid()) {
      return;
    }
    present({
      accountId: usernameField.value
    });
    presentGlobal({
      loggedIn: true
    });
    passField.clear();
  });
  const logoutAction = f.registerAction("logout", (evt, present) => {
    evt.preventDefault();
    present({
      logout: true
    });
    presentGlobal({
      loggedIn: false
    });
  });
  return { logoutAction, loginAction };
}
