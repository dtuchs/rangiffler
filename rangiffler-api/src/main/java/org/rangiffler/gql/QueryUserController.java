package org.rangiffler.gql;

import org.rangiffler.model.gql.PhotoGql;
import org.rangiffler.model.gql.UserGql;
import org.rangiffler.service.PhotoService;
import org.rangiffler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class QueryUserController {

  private final UserService userService;
  private final PhotoService photoService;

  @Autowired
  public QueryUserController(UserService userService, PhotoService photoService) {
    this.userService = userService;
    this.photoService = photoService;
  }

  @SchemaMapping(typeName = "User", field = "friends")
  public Slice<UserGql> friends(UserGql user,
                                @Argument int page,
                                @Argument int size) {
    return userService.friends(
        user.username(),
        PageRequest.of(page, size)
    );
  }

  @SchemaMapping(typeName = "User", field = "incomeInvitations")
  public Slice<UserGql> incomeInvitations(UserGql user,
                                          @Argument int page,
                                          @Argument int size) {
    return userService.incomeInvitations(
        user.username(),
        PageRequest.of(page, size)
    );
  }

  @SchemaMapping(typeName = "User", field = "outcomeInvitations")
  public Slice<UserGql> outcomeInvitations(UserGql user,
                                           @Argument int page,
                                           @Argument int size) {
    return userService.outcomeInvitations(
        user.username(),
        PageRequest.of(page, size)
    );
  }

  @SchemaMapping(typeName = "User", field = "photos")
  public Slice<PhotoGql> photos(UserGql user,
                                @Argument int page,
                                @Argument int size) {
    return photoService.allUserPhotosGql(
        user.username(),
        PageRequest.of(page, size)
    );
  }

//  query user {
//    user {
//      id
//          username
//      photos(page: 0, size: 10) {
//        edges {
//          node {
//            id
//                description
//          }
//        }
//        pageInfo {
//          hasPreviousPage
//              hasNextPage
//        }
//      }
//      friends(page: 0, size: 10) {
//        edges {
//          node {
//            id
//                username
//          }
//        }
//        pageInfo {
//          hasPreviousPage
//              hasNextPage
//        }
//      }
//      outcomeInvitations(page: 0, size: 10) {
//        edges {
//          node {
//            id
//                username
//          }
//        }
//        pageInfo {
//          hasPreviousPage
//              hasNextPage
//        }
//      }
//    }
//  }
  @QueryMapping
  public UserGql user(@AuthenticationPrincipal Jwt principal) {
    return userService.currentUserGql(principal.getClaim("sub"));
  }
}
