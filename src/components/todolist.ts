import { VNode } from "frets";
import { App, RealWorldProps } from "../app";
import { $, $$ } from "~styles/app-styles";
import { CenteredPanel } from "./CenteredPanel";
import { IStateNode } from "frets/Frets";

export const stateGraph: IStateNode<RealWorldProps> = {
  name: "default",
  renderer: x =>
    $.div.bgGray_200.p_2.h(
      x.modelProps.list && x.modelProps.list.length > 0
        ? Object.keys(x.modelProps.list).map((key: string | number) => {
            const todo = x.modelProps.list[key];
            return $.div.borderB.borderGray_400.p_1.m_1.h(
              {
                key: todo.id
              },
              [todo.title]
            );
          })
        : []
    ),
  edges: [
    {
      name: "placeholder",
      guard: props => props.loading,
      renderer: () =>
        $.div.bgGray_200.p_2.h([$.div.textGray_700.italic.h(["Loading"])])
    }
  ]
};
export function showList(app: App): VNode {
  const loadInit = app.registerAction("showLoading", (evt, propose) => {
    if (!app.modelProps.loading) {
      propose({ loading: true });
      setTimeout(() => {
        if (!app.modelProps.list) {
          propose({ showPlaceholder: true });
        }
      }, 200);
      // fetch('http://slowwly.robertomurray.co.uk/delay/900/url/https://jsonplaceholder.typicode.com/todos')
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(json => {
          console.log("list", json);
          propose({
            loading: false,
            showPlaceholder: false,
            list: json
          });
        });
    }
  });

  if (!app.modelProps.list && !app.modelProps.loading) {
    loadInit(new Event(""));
  }

  return CenteredPanel.h([
    $.div.py_1.m_2.minWFull.h([
      $$("h2").fontBold.h_2.mb_5.h(["List of Items Loaded from API"]),
      app.currentStateNode.renderer(app)
    ])
  ]);
}
