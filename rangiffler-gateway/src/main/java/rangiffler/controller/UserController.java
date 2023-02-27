package rangiffler.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import rangiffler.model.UserJson;
import rangiffler.service.UserService;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserJson> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("users/{userId}")
    public List<UserJson> getFriendsByUserId(@PathVariable int userId) {
        return userService.getFriends(userId);
    }

    @PostMapping("users/{userId}")
    public List<UserJson> addFriendToUser(@PathVariable int userId,
                                @RequestBody UserJson friend) {
        return userService.addUserToFriends(userId, friend);
    }

    @DeleteMapping("users/{userId}")
    public List<UserJson> removeFriendFromUser(@PathVariable int userId,
                                          @RequestBody UserJson friend) {
        return userService.removeUserFromFriends(userId, friend);
    }


}
