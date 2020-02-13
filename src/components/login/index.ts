import { IMountable, setup } from "frets";
import { RealWorldProps } from "../../app";
import { LoginProps, willAccept } from "./models";
import { willMutate, willUseStateGraph } from "./state";
import { willHandle } from "./actions";
import { CenteredPanel } from "../CenteredPanel";
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
      willAccept(f, presentGlobal);
      willMutate(f);
      const { logoutAction, loginAction } = willHandle(f, presentGlobal);
      willUseStateGraph(f, logoutAction, loginAction);

      f.registerView(app => {
        return CenteredPanel.h({ key: "login" }, [
          ErrorMsg(app.modelProps.error),
          app.currentStateNode.renderer(app)
        ]);
      });
    },
    {
      projector
    }
  );
}
