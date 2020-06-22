import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  // inject ActivatesRoute service here to fetch route parameter set into app-routing.module.ts
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // retrieve dynamic id from route parameters
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']; // cast string to number using +
      this.editMode = params['id'] != null; // if id is present then edit mode else new mode because id is undefined
    });
  }

}
