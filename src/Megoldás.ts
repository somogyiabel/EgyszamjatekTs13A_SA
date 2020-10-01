import Játékos from "./Játékos";
import fs from "fs";

export default class Megoldás {
    private _játékosok: Játékos[] = [];
    private _sikeresBeolvasás: boolean = true;

    // jellemző definiálása
    public get sikeresBeolvasás(): boolean {
        return this._sikeresBeolvasás;
    }
    public get játékosokSzáma(): number {
        return this._játékosok.length;
    }

    public get fordulókSzáma(): number {
        return this._játékosok[0].fordulókSzáma;
    }

    public get voltEgyesTipp(): boolean {
        let voltEgyesTipp: boolean = false;
        for (const i of this._játékosok) {
            if (i.elsőFordulóTippje === 1) {
                voltEgyesTipp = true;
                break;
            }
        }
        return voltEgyesTipp;
    }

    public get játékLegnagyobbTipp(): number {
        let játékLegnagyobbTipp: number = 0;
        for (const i of this._játékosok) {
            if (i.játékosLegnagyobbTipp > játékLegnagyobbTipp) {
                játékLegnagyobbTipp = i.játékosLegnagyobbTipp;
            }
        }
        return játékLegnagyobbTipp;
    }

    constructor(forrás: string) {
        try {
            fs.readFileSync(forrás)
                .toString()
                .split("\n")
                .forEach(i => {
                    const aktSor: string = i.trim(); // Vezérlő karkterek levágása \r, ha windows sorvég
                    this._játékosok.push(new Játékos(aktSor));
                });
        } catch (error) {
            console.log(`Hiba: ${(error as Error).message}`);
            this._sikeresBeolvasás = false;
        }
    }

    public nyertesTipp(forduló: number): null | number {
        const stat: number[] = new Array(100).fill(0); // 100 elemű vektoe 0-al feltöltve
        this._játékosok.forEach(i => {
            stat[i.fordulóTippje(forduló)]++;
        });
        // null érték jelzi, hogy nem volt nyertes tipp a megadott fordulóban
        let nyertesTipp: null | number = null;
        for (let i = 1; i < stat.length; i++) {
            if (stat[i] === 1) {
                nyertesTipp = i;
                break;
            }
        }
        return nyertesTipp;
    }

    public nyertesJátékos(forduló: number): null | Játékos {
        let nyertes: null | Játékos = null;
        const nyertesTipp: null | number = this.nyertesTipp(forduló);
        if (nyertesTipp != null) {
            for (const i of this._játékosok) {
                if (i.fordulóTippje(forduló) === nyertesTipp) {
                    nyertes = i;
                    break;
                }
            }
        }
        return nyertes;
    }
    public állománybaÍr(állományNév: string, forduló: number, tipp: number, játékosNeve: string): void {
        const ki: string[] = [];
        ki.push(`Forduló sorszáma: ${forduló}.`);
        ki.push(`Nyertes tipp: ${tipp}.`);
        ki.push(`Nyertes játékos: ${játékosNeve}.`);
        fs.writeFileSync(állományNév, ki.join("\r\n"));
    }
}
