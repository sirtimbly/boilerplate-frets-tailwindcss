import { app } from "../app";
import { h } from "maquette";

export const renderRoot = (app: app) => {
  return h('div.max-w-sm.mx-auto.flex.p-6.bg-white.rounded-lg.shadow-xl', [`Hello ${app.modelProps.username}`])
}
