import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  // selected recipe id
  recipeId: number;
  // flag to check if new recipe added OR edit existing recipe
  editMode = false;
  // reactive approach to define and initializing form
  recipeForm: FormGroup;

  // to work FromArray in new angular versions
  get controls() {
    // need to type cast as FormArray to know it is array to angular
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  // inject ActivatesRoute service here to fetch route parameter set into app-routing.module.ts
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    // retrieve dynamic id from route parameters
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']; // cast string to number using +
      this.editMode = params['id'] != null; // if id is present then edit mode else new mode because id is undefined

      // call whenever our route params changes
      this.initForm();
    });
  }

  // initialize reactive form here
  private initForm() {
    let existingRecipeName = '';
    let existingRecipeImagePath = '';
    let existingRecipeDescription = '';
    let existingRecipeIngredients = new FormArray([]);

    // check if we are in edit mode
    if (this.editMode) {
      // select existing recipe here
      const recipe = this.recipeService.getSingleRecipe(this.recipeId);
      // for initial values in form if in update mode else empty for new values
      existingRecipeName = recipe.name;
      existingRecipeImagePath = recipe.imagePath;
      existingRecipeDescription = recipe.description;

      // check if existing recipe contains any ingredients
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          existingRecipeIngredients.push(
            // this is for ingredients if present in recipe as group of ingredient name and amount
            new FormGroup({
              // controls for ingredients
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    // get outer shell for our form
    this.recipeForm = new FormGroup({
      // all controls of reactive form define here as key: value pairs
      // new FormControl(initialValue, validators/custome validators, async validators)
      'name': new FormControl(existingRecipeName),
      'imagePath': new FormControl(existingRecipeImagePath),
      'description': new FormControl(existingRecipeDescription),
      'ingredients': existingRecipeIngredients // it is a formArray
    });
  }

  // get form data here when hit save (i.e type submit) button
  onSubmit() {
    console.log(this.recipeForm);
  }

  // add new ingredient control to FormArray of ingredients
  onAddIngredient() {
    // casting important for angular/typescript
    (<FormArray>this.recipeForm.get('ingredients')).push(
      // because ingredient is of FormGroup type
      new FormGroup({
        // controls for ingredient
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }
}
