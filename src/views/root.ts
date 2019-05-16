import { app } from "../app";
import { h } from "maquette";

export const renderRoot = (app: app) => {
  return h('div', [`Hello ${app.modelProps.username}`])
}
