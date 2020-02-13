import { IFunFrets, setup, PropsWithFields } from "frets";
import { memoize } from "lodash-es";

import { showList, stateGraph } from "./components/todolist";
import loginComponent from "./components/login";
import { $, $$ } from "~styles/app-styles";
import { successBox } from "~components/CenteredPanel";

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
  f.registerAcceptor((proposal: Partial<RealWorldProps>, state) => {
    console.log("accepting global proposal", proposal);
    state({ ...proposal });
  });
  const login = loginComponent(f.present, f.projector);
  f.registerStateGraph(stateGraph);
  f.registerView(() => {
    return $.div.h([
      $$("h1").fontBold.text_2xl.textCenter.mxAuto.mt_3.h([
        "A Simple Frets Sample App"
      ]),
      login.stateRenderer(),
      f.modelProps.loggedIn && showList(f),
      successBox(["props: ", JSON.stringify(f.modelProps)]) //+
    ]);
  });
}).mountTo("app");
