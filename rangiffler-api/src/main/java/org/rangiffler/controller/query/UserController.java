package org.rangiffler.controller.query;

import graphql.schema.DataFetchingEnvironment;
import graphql.schema.SelectedField;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import org.rangiffler.ex.TooManySubQueriesException;
import org.rangiffler.model.type.LikeGql;
import org.rangiffler.model.type.LikesGql;
import org.rangiffler.model.type.PhotoGql;
import org.rangiffler.model.type.UserGql;
import org.rangiffler.service.FriendRequestSubscription;
import org.rangiffler.service.PhotoService;
import org.rangiffler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@PreAuthorize("isAuthenticated()")
public class UserController {

  private final UserService userService;
  private final PhotoService photoService;

  @Autowired
  public UserController(UserService userService, PhotoService photoService, FriendRequestSubscription friendRequestSubscription) {
    this.userService = userService;
    this.photoService = photoService;
  }

  @SchemaMapping(typeName = "User", field = "friends")
  public Slice<UserGql> friends(UserGql user,
                                @Argument int page,
                                @Argument int size,
                                @Argument @Nullable String searchQuery) {
    return userService.friends(
        user.username(),
        PageRequest.of(page, size),
        searchQuery
    );
  }

  @SchemaMapping(typeName = "User", field = "incomeInvitations")
  public Slice<UserGql> incomeInvitations(UserGql user,
                                          @Argument int page,
                                          @Argument int size,
                                          @Argument @Nullable String searchQuery) {
    return userService.incomeInvitations(
        user.username(),
        PageRequest.of(page, size),
        searchQuery
    );
  }

  @SchemaMapping(typeName = "User", field = "outcomeInvitations")
  public Slice<UserGql> outcomeInvitations(UserGql user,
                                           @Argument int page,
                                           @Argument int size,
                                           @Argument @Nullable String searchQuery) {
    return userService.outcomeInvitations(
        user.username(),
        PageRequest.of(page, size),
        searchQuery
    );
  }

  @SchemaMapping(typeName = "Photo", field = "likes")
  public LikesGql likes(PhotoGql photo) {
    List<LikeGql> likes = photoService.photoLikes(
        photo.id()
    );
    return new LikesGql(
        likes.size(),
        likes
    );
  }

  @SchemaMapping(typeName = "User", field = "photos")
  public Slice<PhotoGql> photos(UserGql user,
                                @Argument int page,
                                @Argument int size) {
    return photoService.allUserPhotos(
        user.username(),
        PageRequest.of(page, size)
    );
  }

  /**
   * <pre>
   *    query user {
   *    user {
   *      id
   *      username
   *      photos(page: 0, size: 10) {
   *        edges {
   *          node {
   *            id
   *            description
   *          }
   *        }
   *        pageInfo {
   *          hasPreviousPage
   *          hasNextPage
   *        }
   *      }
   *      friends(page: 0, size: 10) {
   *        edges {
   *          node {
   *            id
   *            username
   *          }
   *        }
   *        pageInfo {
   *          hasPreviousPage
   *          hasNextPage
   *        }
   *      }
   *      outcomeInvitations(page: 0, size: 10) {
   *        edges {
   *          node {
   *            id
   *            username
   *          }
   *        }
   *        pageInfo {
   *          hasPreviousPage
   *          hasNextPage
   *        }
   *      }
   *    }
   *  }
   * </pre>
   */
  @QueryMapping
  public UserGql user(@AuthenticationPrincipal Jwt principal,
                      DataFetchingEnvironment env) {
    checkSubQueries(env, 2, "friends");
    return userService.currentUser(principal.getClaim("sub"));
  }

  private void checkSubQueries(@Nonnull DataFetchingEnvironment env, int depth, @Nonnull String... queryKeys) {
    for (String queryKey : queryKeys) {
      List<SelectedField> selectors = env.getSelectionSet().getFieldsGroupedByResultKey().get(queryKey);
      if (selectors != null && selectors.size() > depth) {
        throw new TooManySubQueriesException("Can`t fetch over 2 " + queryKey + " sub-queries");
      }
    }
  }
}
