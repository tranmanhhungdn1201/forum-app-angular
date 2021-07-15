import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe(categories => this.categories = categories)
  }

}
