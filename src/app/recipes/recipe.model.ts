// model for recipe => just blueprint for object we create

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string; // url from web

    // need to instantiate obj with new keyword
    constructor(name: string, desc: string, imagePAth: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePAth;
    }
}