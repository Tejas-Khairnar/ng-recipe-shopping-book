import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

import { Recipe } from './../recipe.model';

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
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

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
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    // get outer shell for our form
    this.recipeForm = new FormGroup({
      // all controls of reactive form define here as key: value pairs
      // new FormControl(initialValue, validators/custome validators, async validators)
      'name': new FormControl(existingRecipeName, Validators.required),
      'imagePath': new FormControl(existingRecipeImagePath, Validators.required),
      'description': new FormControl(existingRecipeDescription, Validators.required),
      'ingredients': existingRecipeIngredients // it is a formArray
    });
  }

  // get form data here when hit save (i.e type submit) button
  onSubmit() {
    // construction of new recipe through form input values for recipe
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    // check mode either edit existing one or add new recipe
    if (this.editMode) {
      // update existing recipe with new recipe values comming from form inputs
      this.recipeService.updateSelectedRecipeFromList(this.recipeId, newRecipe);
      // can use this.recipeForm.value as 2nd argument above as it has same format as our Recipe model
    } else {
      // add new recipe to recipe-list with new recipe values comming from form inputs
      this.recipeService.addNewRecipeToList(newRecipe);
      // can use this.recipeForm.value as 2nd argument above as it has same format as our Recipe model
    }

    // reset form here
    this.onCancelForm();
  }

  // add new ingredient control to FormArray of ingredients
  onAddIngredient() {
    // casting important for angular/typescript
    (<FormArray>this.recipeForm.get('ingredients')).push(
      // because ingredient is of FormGroup type
      new FormGroup({
        // controls for ingredient
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  // discard form's values
  onCancelForm() {
    // navigate to 1 level up from this current route
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // delete selected ingredient from FormArray of ingredient control
  onDeleteIngredientFromFormArray(index: number) {
    // remove control from FormArray using its index and removeAt method
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
