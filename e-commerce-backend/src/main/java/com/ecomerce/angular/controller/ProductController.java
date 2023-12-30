package com.ecomerce.angular.controller;

import com.ecomerce.angular.entity.ImageModel;
import com.ecomerce.angular.entity.Product;
import com.ecomerce.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;


    //Admin has access
    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = {"/addNewProduct"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addNewProduct(@RequestPart("product") Product product,
                                 @RequestPart("imageFile") List<MultipartFile> file){

        try{
            Set<ImageModel> images = uploadImage(file);
            product.setProductImages(images);
            return productService.addNewProduct(product);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    /*To process the image so that it can be saved in database */
    public Set<ImageModel> uploadImage(List<MultipartFile> multipartFile) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile p: multipartFile){
            ImageModel image = new ImageModel(
                    p.getOriginalFilename(),
                    p.getContentType(),
                    p.getBytes()
            );
            imageModels.add(image);
        }
        return imageModels;
    }

}
