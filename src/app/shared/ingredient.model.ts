// shared for both Recipes and Shopping List components

export class Ingredient {
    // public name: string;
    // public amount: number;

    // constructor(name: string, amount: number) {
    //     this.name = name;
    //     this.amount = amount;
    // }

    // shortcut for above initialization in TS, variables automatically created and initialized too
    constructor(public name: string, public amount: number) { }
}