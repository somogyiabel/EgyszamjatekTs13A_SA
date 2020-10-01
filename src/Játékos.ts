export default class Játékos {
    private _név: string;
    private _tippek: number[] = [];

    public get fordulókSzáma(): number {
        return this._tippek.length;
    }

    public get elsőFordulóTippje(): number {
        return this._tippek[0];
    }

    public get név(): string {
        return this._név;
    }

    public get játékosLegnagyobbTipp(): number {
        // let legnagyobbTipp: number = 0;

        // this._tippek.forEach(i => {
        //     if (i > legnagyobbTipp) {
        //         legnagyobbTipp = i;
        //     }
        // });

        // for (const i of this._tippek) {
        //     if (i > legnagyobbTipp) {
        //         legnagyobbTipp = i;
        //     }
        // }

        // return legnagyobbTipp;

        return Math.max(...this._tippek.values());
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._név = m[0];
        for (let i = 1; i < m.length; i++) {
            this._tippek.push(parseInt(m[i]));
        }
    }

    public fordulóTippje(forduló: number): number {
        return this._tippek[forduló - 1];
    }
}
