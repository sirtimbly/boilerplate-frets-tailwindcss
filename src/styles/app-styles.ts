
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
get borderGray_700() { return this.add("border-gray-700"); }
get borderRed_500() { return this.add("border-red-500"); }
get borderRed_600() { return this.add("border-red-600"); }
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
get textXs() { return this.add("text-xs"); }
get text_2xl() { return this.add("text-2xl"); }
get italic() { return this.add("italic"); }
get btn() { return this.add("btn"); }
get btnBlue() { return this.add("btn-blue"); }

}

export const $$ = (selector?: string): BaseStyles =>  {
    return new BaseStyles("" + selector || "");
};

export const $ = $$();

