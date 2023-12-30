package com.ecomerce.angular.service;

import com.ecomerce.angular.dao.RoleDao;
import com.ecomerce.angular.dao.UserDao;
import com.ecomerce.angular.entity.Role;
import com.ecomerce.angular.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerNewUser(User user) {

        Role role = roleDao.findById("user").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);

        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    /*1. When we restart or re-run application,
        it will deleted all the table in the  database(since we have used 'create' as ddl-auto command)
    2. then this method will be run, here logic of roles and users will be writen
    */

    public void initRolesAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        //Admin Role setting
        Set<Role> adminRoles = new HashSet<>();
        User adminUser = new User();
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        adminUser.setRole(adminRoles);

        adminRoles.add(adminRole);
        userDao.save(adminUser);

        //User Role setting
        Set<Role> userRoles = new HashSet<>();
        User user = new User();
        user.setUserFirstName("Kiran");
        user.setUserLastName("Suryawanshi");
        user.setUserName("kiran123");
        user.setUserPassword(getEncodedPassword("kiran@pass"));
        user.setRole(userRoles);

        userRoles.add(userRole);
        userDao.save(user);


    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }


}
