package org.rangiffler.controller.query;

import jakarta.annotation.Nullable;
import org.rangiffler.model.type.UserGql;
import org.rangiffler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class UsersController {

  private final UserService userService;

  @Autowired
  public UsersController(UserService userService) {
    this.userService = userService;
  }

  /**
   * <pre>
   *    query users {
   *     users(page: 0, size: 10) {
   *      edges {
   *        node {
   *          id
   *          username
   *        }
   *      }
   *      pageInfo {
   *        hasPreviousPage
   *        hasNextPage
   *      }
   *    }
   *  }
   * </pre>
   */
  @QueryMapping
  public Slice<UserGql> users(@AuthenticationPrincipal Jwt principal,
                              @Argument int page,
                              @Argument int size,
                              @Argument @Nullable String searchQuery) {
    return userService.allUsers(
        principal.getClaim("sub"),
        PageRequest.of(page, size),
        searchQuery
    );
  }
}
