import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../_model/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDirective } from '../drag.directive';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    DragDirective
  ],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css',
})
export class AddNewProductComponent implements OnInit {

  ngOnInit(): void {}

  constructor(
    private _productService: ProductService,
    private _sanitizer: DomSanitizer
  ) {}

  product: Product = {
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  };

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);

    this._productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        console.log(response);
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /* this.product to Formdata Conversion
   */
  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product', //"product" is taken from backend 'addNewProduct' function
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    //There can be multiple Images of 1 Product
    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile', //"imaageFile" is taken from backend 'addNewProduct' function
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  //choosen button
  /* which ever image will get,
    1. create object from images, 
    2. it will contain 'url' and image itself to 'Preview' image 
  */
  onFileSelected(event : any) {
    if (event.target.files) {
      const imageFile = event.target.files[0];

      //creating object
      const fileHandle: FileHandle = {
        //key: value
        file: imageFile,
        url: this._sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };

      this.product.productImages.push(fileHandle);
    }
  }

  //Close icon for Images -- x
  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }


  //Drag and Drop Image Feature
  fileDropped(fileHandle: FileHandle){
    this.product.productImages.push(fileHandle);
  }


  clearForm(productForm: NgForm) {
    productForm.reset();
  }
}
