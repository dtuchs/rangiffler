package org.rangiffler.controller.mutation;

import org.rangiffler.model.input.FriendshipInput;
import org.rangiffler.model.input.UserInput;
import org.rangiffler.model.type.UserGql;
import org.rangiffler.service.UserService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class UserMutationController {

  private final UserService userService;

  public UserMutationController(UserService userService) {
    this.userService = userService;
  }

  @MutationMapping
  public UserGql user(@Argument UserInput userInput) {
    return userService.updateUser(userInput);
  }

  @MutationMapping
  public void friendship(@AuthenticationPrincipal Jwt principal,
                         @Argument FriendshipInput friendshipInput) {
    String username = principal.getClaim("sub");
    switch (friendshipInput.action()) {
      case ADD -> userService.addFriend(username, friendshipInput.user());
      case ACCEPT -> userService.acceptInvitation(username, friendshipInput.user());
      case REJECT -> userService.declineInvitation(username, friendshipInput.user());
      case DELETE -> userService.removeFriend(username, friendshipInput.user());
      default -> throw new UnsupportedOperationException("Action " + friendshipInput.action() + " not implemented");
    }
  }
}
