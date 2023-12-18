package com.ecomerce.angular.service;

import com.ecomerce.angular.dao.RoleDao;
import com.ecomerce.angular.entity.Role;
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
