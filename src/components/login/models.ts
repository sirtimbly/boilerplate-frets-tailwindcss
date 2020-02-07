import { IFunFrets, PropsWithFields } from "frets/src";
export class LoginProps extends PropsWithFields {
  accountId: string = "";

  loading: boolean;

  logout: boolean;

  error: string = "";

  list: any;

  showPlaceholder: boolean;
}
export const willAccept = (f: IFunFrets<LoginProps>) => {
  f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
    console.log("accepting login proposal", proposal);
    if (proposal.accountId !== f.modelProps.accountId) {
      setTimeout(() => {
        if (proposal.accountId && proposal.accountId !== "tim") {
          state({
            loading: false,
            error: `Invalid username: ${proposal.accountId}`,
            accountId: ""
          });
        } else {
          state({ loading: false, accountId: proposal.accountId });
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
    console.log("accepting logout", proposal);
    if (proposal.logout !== undefined) {
      setTimeout(() => {
        state({ logout: false, loading: false });
      }, 500);
      state({ logout: true, loading: true });
    }
  });
  // f.registerAcceptor((proposal: Partial<LoginProps>, state) => {
  //   console.log("accepting placeholder proposal", proposal);
  //   state({ showPlaceholder: proposal.showPlaceholder || false });
  // });
};
