import { IFunFrets, setup, PropsWithFields } from "frets/src";
import { memoize } from "lodash-es";

import { showList } from "./components/todolist";
import loginComponent from "./components/login";
import { $, $$ } from "~styles/app-styles";

export class RealWorldProps extends PropsWithFields {
  loggedIn: boolean = false;
  loading: boolean;
  list: any;
  showPlaceholder: boolean;
}

export type ActionFn = (
  e: Event,
  data?: Readonly<RealWorldProps>
) => Partial<RealWorldProps> | undefined;

export type App = IFunFrets<RealWorldProps>;

setup(new RealWorldProps(), (f: App) => {
  const login = loginComponent(f.present, f.projector);

  f.registerAcceptor((proposal: Partial<RealWorldProps>, state) => {
    if (proposal.list !== f.modelProps.list) {
      f.modelProps.list = proposal.list;
    }
    state(f.modelProps);
  });

  f.registerView(() => {
    return $.div.h([
      $$("h1").fontBold.text_2xl.textCenter.mxAuto.mt_3.h([
        "A Simple Frets Sample App"
      ]),
      login.stateRenderer(),
      f.modelProps.loggedIn && showList(f)
    ]);
  });
}).mountTo("app");
