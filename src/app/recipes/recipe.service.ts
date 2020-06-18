import { Recipe } from './recipe.model';

export class RecipeService {
    // stores recipe based on Recipe blueprint
    private recipes: Recipe[] = [
        new Recipe('Test', 'Simple recipe', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1470&q=80'),
        new Recipe('Test', 'Simple recipe', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1470&q=80')
    ];

    // return recipes outside
    getRecipes() {
        // don't return original array reference outside, may cause issues
        // pass copy of original array outside using Array.slice()
        return this.recipes.slice();
    }
}