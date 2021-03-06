package com.theironyard.controllers;

import com.theironyard.entities.Dog;
import com.theironyard.entities.Post;
import com.theironyard.entities.User;
import com.theironyard.services.DogRepository;
import com.theironyard.services.PostRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;

/**
 * Created by will on 7/7/16.
 */
@RestController
public class UpdawwgRestController {
    // link tables
    @Autowired
    DogRepository dogs;

    @Autowired
    UserRepository users;

    @Autowired
    PostRepository posts;

    // start h2 web server
    @PostConstruct
    public void init() throws SQLException {
        Server.createWebServer().start();
    }

    // get/post routes for users
    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public Iterable<User> getUsers() {
        return users.findAll();
    }

    // make login happen in here
    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public void user(User user, HttpSession session) throws Exception {
        User userFromDB = users.findFirstByName(user.getName());
        if (userFromDB == null) {
            user.setPassword(PasswordStorage.createHash(user.getPassword()));
            users.save(user);
        }
        else if (!PasswordStorage.verifyPassword(user.getPassword(), userFromDB.getPassword())) {
            throw new Exception("Wrong password!");
        }

        session.setAttribute("username", user.getName());
    }

    // routes for dogs
    @RequestMapping(path = "/dogs", method = RequestMethod.GET)
    public Iterable<Dog> getDogs() {
        return dogs.findAll();
    }

    @RequestMapping(path = "/dogs", method = RequestMethod.POST)
    public void dog(String name, String image, String breed, int age, String description, Boolean favorite) {
        Dog dog = new Dog(name, image, breed, age, description, favorite);
        dogs.save(dog);
    }

    // routes for posts
    @RequestMapping(path = "/posts", method = RequestMethod.GET)
    public Iterable<Post> getPosts() {
        return posts.findAll();
    }

    @RequestMapping(path = "/posts", method = RequestMethod.POST)
    public void post(int replyId, String message, int dogId, int userId) {
        Dog dog = dogs.findOne(dogId);
        User user = users.findOne(userId);
        Post post = new Post(replyId, message, user, dog);
        posts.save(post);
    }
}
