package com.ecomerce.angular.service;

import com.ecomerce.angular.dao.ProductDao;
import com.ecomerce.angular.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product){
        return productDao.save(product);

    }


}
