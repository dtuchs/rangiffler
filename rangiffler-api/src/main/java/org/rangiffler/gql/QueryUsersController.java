package org.rangiffler.gql;

import org.rangiffler.model.gql.UserGql;
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
public class QueryUsersController {

  private final UserService userService;

  @Autowired
  public QueryUsersController(UserService userService) {
    this.userService = userService;
  }

//  query users {
//    users(page: 0, size: 10) {
//      edges {
//        node {
//          id
//              username
//        }
//      }
//      pageInfo {
//        hasPreviousPage
//            hasNextPage
//      }
//    }
//  }
  @QueryMapping
  public Slice<UserGql> users(@AuthenticationPrincipal Jwt principal,
                              @Argument int page,
                              @Argument int size) {
    return userService.allUsers(
        principal.getClaim("sub"),
        PageRequest.of(page, size)
    );
  }
}
