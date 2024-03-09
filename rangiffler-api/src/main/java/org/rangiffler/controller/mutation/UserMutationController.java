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


  /**
   * <pre>
   * mutation user {
   *   user(input: {
   *     id: "28d4981f-f9c0-4b21-a250-825b935910a1",
   *     firstname: "PCHELA"
   *  }) {
   *    id
   *    firstname
   *   }
   * }
   * </pre>
   */
  @MutationMapping
  public UserGql user(@Argument UserInput input) {
    return userService.updateUser(input);
  }

  /**
   * <pre>
   *  mutation friendship {
   *    friendship(input: {
   *      user: "2e4bc114-c65c-4487-9fb3-dd9da16907ce",
   *      action: ADD
   *    })
   *  }
   * </pre>
   */
  @MutationMapping
  public void friendship(@AuthenticationPrincipal Jwt principal,
                         @Argument FriendshipInput input) {
    String username = principal.getClaim("sub");
    switch (input.action()) {
      case ADD -> userService.addFriend(username, input.user());
      case ACCEPT -> userService.acceptInvitation(username, input.user());
      case REJECT -> userService.declineInvitation(username, input.user());
      case DELETE -> userService.removeFriend(username, input.user());
      default -> throw new UnsupportedOperationException("Action " + input.action() + " not implemented");
    }
  }
}
