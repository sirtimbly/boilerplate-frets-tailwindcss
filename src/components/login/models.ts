import { IFunFrets, PropsWithFields } from "frets";
import { RealWorldProps } from "~app";
export class LoginProps extends PropsWithFields {
  accountId: string = "";

  loading: boolean;

  logout: boolean;

  error: string = "";

  list: any;

  showPlaceholder: boolean;

  currentAction: "" | "login" | "logout";
}
export const willAccept = (
  f: IFunFrets<LoginProps>,
  presentGlobal: (proposal: Partial<RealWorldProps>) => void
) => {
  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    console.log("accepting login proposal", proposal);
    if (
      proposal.currentAction === "login" &&
      proposal.accountId !== f.modelProps.accountId
    ) {
      setTimeout(() => {
        if (proposal.accountId && proposal.accountId !== "tim") {
          state({
            loading: false,
            error: `Invalid username: ${proposal.accountId}`,
            accountId: ""
          });
        } else {
          console.log("logged in");
          state({
            currentAction: "",
            loading: false,
            accountId: proposal.accountId
          });
          presentGlobal({
            loggedIn: true
          });
        }
      }, 700);
      state({
        logout: false,
        error: "",
        loading: true
      });
    }
  });
  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    if (proposal.currentAction === "logout") {
      console.log("accepting logout", proposal);
      setTimeout(() => {
        state({ loading: false, accountId: "" });
        presentGlobal({
          loggedIn: false
        });
      }, 500);
      state({ loading: true });
    }
  });
  // f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
  //   console.log("accepting placeholder proposal", proposal);
  //   state({ showPlaceholder: proposal.showPlaceholder || false });
  // });
};
