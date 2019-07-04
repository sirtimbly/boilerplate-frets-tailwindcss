
  import {maquette as Maquette} from "frets";

    export default class BaseStyles {
        public chain: string[];
        public conditions: boolean[] = [];
        public classProps: any = {};
        private writeConditionIndex: number = 0;
        private readConditionIndex: number = 0;
        private classObjectMode: boolean = false;

        constructor(selector: string) {
            this.chain = new Array<string>();
            if (selector.length > 0) {
                this.chain.push(selector);
            }
            return this;
        }

        public when = (condition: boolean): BaseStyles => {
            this.classObjectMode = true;
            this.conditions[this.writeConditionIndex] = condition;
            return this;
        }

        public andWhen = (condition: boolean): BaseStyles => {
            this.classObjectMode = true;
            this.writeConditionIndex++;
            this.readConditionIndex++;
            return this.when(condition);

        }

        public otherwise = (): BaseStyles => {
            this.classObjectMode = true;
            return this.andWhen( !this.conditions[this.readConditionIndex]);
        }

        public h = (properties?: Maquette.VNodeProperties, children?: (string | Maquette.VNode | Maquette.VNodeChild)[]): Maquette.VNode => {
            if (this.classObjectMode) {
                throw Error("You can't build a vnode when you are using this for building a classes object");
            }
            if (properties && typeof properties === "object" && properties.length > 0) {
                return Maquette.h(this.toString(), properties);
            }
            return Maquette.h(this.toString(), properties, children);
        }

        public toObj = () => {
            if (!this.classObjectMode) {
                // tslint:disable-next-line:max-line-length
                throw Error("You need to call at least one conditional method in order to use this as a classes object generator");
            }
            return this.classProps;
        }

        get div(): BaseStyles { return new BaseStyles("div"); }
        get img(): BaseStyles { return new BaseStyles("img"); }
        get a(): BaseStyles { return new BaseStyles("a"); }
        get p(): BaseStyles { return new BaseStyles("p"); }
        get ul(): BaseStyles { return new BaseStyles("ul"); }
        get ol(): BaseStyles { return new BaseStyles("ol"); }
        get li(): BaseStyles { return new BaseStyles("li"); }
        get section(): BaseStyles { return new BaseStyles("section"); }
        get header(): BaseStyles { return new BaseStyles("header"); }
        get article(): BaseStyles { return new BaseStyles("article"); }
        get nav(): BaseStyles { return new BaseStyles("nav"); }
        get aside(): BaseStyles { return new BaseStyles("aside"); }
        get span(): BaseStyles { return new BaseStyles("span"); }
        get button(): BaseStyles { return new BaseStyles("button"); }
        get input(): BaseStyles { return new BaseStyles("input"); }
        get label(): BaseStyles { return new BaseStyles("label"); }
        get select(): BaseStyles { return new BaseStyles("select"); }
        get textarea(): BaseStyles { return new BaseStyles("textarea"); }

        public toString = (): string => {
            if (this.classObjectMode) {
                throw Error("You can't build a selector string when you are calling conditional methods");
            }
            if (this.chain.length === 1) {
                return this.chain[0] || "div";
            }
            return this.chain.join(".");
        }

        public $ = (className: string): BaseStyles => {
            return this.add(className);
        }

        public add = (className: string): BaseStyles => {
            if (this.classObjectMode) {
                this.classProps[className] = this.conditions[this.readConditionIndex];
            } else if (className.length > 0) {
                this.chain.push(className);
            }
            return this;
        }

        get bgWhite() { return this.add("bg-white"); }
get bgGray_100() { return this.add("bg-gray-100"); }
get bgGray_200() { return this.add("bg-gray-200"); }
get bgYellow_100() { return this.add("bg-yellow-100"); }
get bgYellow_200() { return this.add("bg-yellow-200"); }
get bgYellow_300() { return this.add("bg-yellow-300"); }
get bgYellow_400() { return this.add("bg-yellow-400"); }
get bgYellow_500() { return this.add("bg-yellow-500"); }
get bgYellow_600() { return this.add("bg-yellow-600"); }
get bgYellow_700() { return this.add("bg-yellow-700"); }
get bgYellow_800() { return this.add("bg-yellow-800"); }
get bgYellow_900() { return this.add("bg-yellow-900"); }
get borderGray_700() { return this.add("border-gray-700"); }
get borderRed_500() { return this.add("border-red-500"); }
get borderRed_600() { return this.add("border-red-600"); }
get borderYellow_100() { return this.add("border-yellow-100"); }
get borderYellow_200() { return this.add("border-yellow-200"); }
get borderYellow_300() { return this.add("border-yellow-300"); }
get borderYellow_400() { return this.add("border-yellow-400"); }
get borderYellow_500() { return this.add("border-yellow-500"); }
get borderYellow_600() { return this.add("border-yellow-600"); }
get borderYellow_700() { return this.add("border-yellow-700"); }
get borderYellow_800() { return this.add("border-yellow-800"); }
get borderYellow_900() { return this.add("border-yellow-900"); }
get rounded() { return this.add("rounded"); }
get border() { return this.add("border"); }
get borderB() { return this.add("border-b"); }
get flex() { return this.add("flex"); }
get flexRow() { return this.add("flex-row"); }
get flexCol() { return this.add("flex-col"); }
get flexNoWrap() { return this.add("flex-no-wrap"); }
get itemsCenter() { return this.add("items-center"); }
get itemsStretch() { return this.add("items-stretch"); }
get flexGrow() { return this.add("flex-grow"); }
get fontBold() { return this.add("font-bold"); }
get h_2() { return this.add("h-2"); }
get m_1() { return this.add("m-1"); }
get m_2() { return this.add("m-2"); }
get mx_2() { return this.add("mx-2"); }
get my_3() { return this.add("my-3"); }
get mxAuto() { return this.add("mx-auto"); }
get mt_2() { return this.add("mt-2"); }
get mb_2() { return this.add("mb-2"); }
get ml_2() { return this.add("ml-2"); }
get mt_3() { return this.add("mt-3"); }
get mb_5() { return this.add("mb-5"); }
get maxWMd() { return this.add("max-w-md"); }
get minWFull() { return this.add("min-w-full"); }
get p_1() { return this.add("p-1"); }
get p_2() { return this.add("p-2"); }
get p_6() { return this.add("p-6"); }
get py_1() { return this.add("py-1"); }
get shadowXl() { return this.add("shadow-xl"); }
get textCenter() { return this.add("text-center"); }
get textBlack() { return this.add("text-black"); }
get textWhite() { return this.add("text-white"); }
get textGray_700() { return this.add("text-gray-700"); }
get textRed_500() { return this.add("text-red-500"); }
get textRed_700() { return this.add("text-red-700"); }
get textYellow_100() { return this.add("text-yellow-100"); }
get textYellow_200() { return this.add("text-yellow-200"); }
get textYellow_300() { return this.add("text-yellow-300"); }
get textYellow_400() { return this.add("text-yellow-400"); }
get textYellow_500() { return this.add("text-yellow-500"); }
get textYellow_600() { return this.add("text-yellow-600"); }
get textYellow_700() { return this.add("text-yellow-700"); }
get textYellow_800() { return this.add("text-yellow-800"); }
get textYellow_900() { return this.add("text-yellow-900"); }
get textXs() { return this.add("text-xs"); }
get text_2xl() { return this.add("text-2xl"); }
get italic() { return this.add("italic"); }
get w_1_2() { return this.add("w-1\/2"); }
get w_1_3() { return this.add("w-1\/3"); }
get w_2_3() { return this.add("w-2\/3"); }
get w_1_4() { return this.add("w-1\/4"); }
get w_2_4() { return this.add("w-2\/4"); }
get w_3_4() { return this.add("w-3\/4"); }
get w_1_5() { return this.add("w-1\/5"); }
get w_2_5() { return this.add("w-2\/5"); }
get w_3_5() { return this.add("w-3\/5"); }
get w_4_5() { return this.add("w-4\/5"); }
get w_1_6() { return this.add("w-1\/6"); }
get w_2_6() { return this.add("w-2\/6"); }
get w_3_6() { return this.add("w-3\/6"); }
get w_4_6() { return this.add("w-4\/6"); }
get w_5_6() { return this.add("w-5\/6"); }
get w_1_12() { return this.add("w-1\/12"); }
get w_2_12() { return this.add("w-2\/12"); }
get w_3_12() { return this.add("w-3\/12"); }
get w_4_12() { return this.add("w-4\/12"); }
get w_5_12() { return this.add("w-5\/12"); }
get w_6_12() { return this.add("w-6\/12"); }
get w_7_12() { return this.add("w-7\/12"); }
get w_8_12() { return this.add("w-8\/12"); }
get w_9_12() { return this.add("w-9\/12"); }
get w_10_12() { return this.add("w-10\/12"); }
get w_11_12() { return this.add("w-11\/12"); }
get btn() { return this.add("btn"); }
get btnBlue() { return this.add("btn-blue"); }

}

export const $$ = (selector?: string): BaseStyles =>  {
    return new BaseStyles("" + selector || "");
};

export const $ = $$();

