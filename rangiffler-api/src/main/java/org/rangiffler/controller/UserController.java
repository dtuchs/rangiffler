package org.rangiffler.controller;

import org.rangiffler.model.UserJson;
import org.rangiffler.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/users")
  public List<UserJson> getAllUsers(@AuthenticationPrincipal Jwt principal) {
    return userService.allUsers(
        principal.getClaim("sub")
    );
  }

  @GetMapping("/currentUser")
  public UserJson getCurrentUser(@AuthenticationPrincipal Jwt principal) {
    return userService.getCurrentUser(
        principal.getClaim("sub")
    );
  }

  @PatchMapping("/currentUser")
  public UserJson updateCurrentUser(@RequestBody UserJson user) {
    return userService.update(user);
  }

  @GetMapping("/friends")
  public List<UserJson> getFriendsByUserId(@AuthenticationPrincipal Jwt principal) {
    return userService.friends(
        principal.getClaim("sub"),
        false
    );
  }

  @GetMapping("invitations")
  public List<UserJson> getInvitations(@AuthenticationPrincipal Jwt principal) {
    return userService.invitations(
        principal.getClaim("sub")
    );
  }

  @PostMapping("users/invite/")
  public UserJson sendInvitation(@RequestBody UserJson user, @AuthenticationPrincipal Jwt principal) {
    return userService.addFriend(
        principal.getClaim("sub"),
        user.username()
    );
  }

  @PostMapping("friends/remove")
  public List<UserJson> removeFriendFromUser(@RequestBody UserJson friend, @AuthenticationPrincipal Jwt principal) {
    return userService.removeFriend(
        principal.getClaim("sub"),
        friend.username()
    );
  }

  @PostMapping("friends/submit")
  public List<UserJson> submitFriend(@RequestBody UserJson friend, @AuthenticationPrincipal Jwt principal) {
    return userService.acceptInvitation(
        principal.getClaim("sub"),
        friend.username()
    );
  }

  @PostMapping("friends/decline")
  public List<UserJson> declineFriend(@RequestBody UserJson friend, @AuthenticationPrincipal Jwt principal) {
    return userService.declineInvitation(
        principal.getClaim("sub"),
        friend.username()
    );
  }
}
