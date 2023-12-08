package com.ecomerce.angular.jwt.service;

import com.ecomerce.angular.jwt.dao.RoleDao;
import com.ecomerce.angular.jwt.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;
//Step 2
    public Role createNewRole(Role role){
        return roleDao.save(role);
    }
}
