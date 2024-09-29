package org.rangiffler.controller.query;

import org.rangiffler.model.type.FeedGql;
import org.rangiffler.model.type.LikeGql;
import org.rangiffler.model.type.LikesGql;
import org.rangiffler.model.type.PhotoGql;
import org.rangiffler.model.type.StatGql;
import org.rangiffler.model.type.UserGql;
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
public class FeedController {

  private final UserService userService;
  private final PhotoService photoService;

  @Autowired
  public FeedController(UserService userService, PhotoService photoService) {
    this.userService = userService;
    this.photoService = photoService;
  }

  @SchemaMapping(typeName = "Feed", field = "stat")
  public List<StatGql> stat(FeedGql feed) {
    return userService.stat(
        feed.username(),
        feed.withFriends()
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

  @SchemaMapping(typeName = "Feed", field = "photos")
  public Slice<PhotoGql> photos(FeedGql feed,
                                @Argument int page,
                                @Argument int size) {
    return feed.withFriends()
        ? photoService.feedPhotos(
        feed.username(),
        PageRequest.of(page, size)
    )
        : photoService.allUserPhotos(
        feed.username(),
        PageRequest.of(page, size)
    );
  }

  @QueryMapping
  public FeedGql feed(@AuthenticationPrincipal Jwt principal,
                      @Argument boolean withFriends) {
    return new FeedGql(
        principal.getClaim("sub"),
        withFriends,
        null,
        null
    );
  }
}
