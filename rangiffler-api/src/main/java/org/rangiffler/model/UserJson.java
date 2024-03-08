package org.rangiffler.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.rangiffler.data.UserEntity;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public record UserJson(
    @JsonProperty("id")
    UUID id,
    @JsonProperty("username")
    String username,
    @JsonProperty("firstName")
    String firstName,
    @JsonProperty("lastName")
    String lastLame,
    @JsonProperty("avatar")
    String avatar,
    @JsonProperty("friendStatus")
    FriendStatus friendStatus
) {
  public static UserJson fromEntity(UserEntity userEntity) {
    return fromEntity(userEntity, null);
  }

  public static UserJson fromEntity(UserEntity userEntity, FriendStatus friendStatus) {
    return new UserJson(
        userEntity.getId(),
        userEntity.getUsername(),
        userEntity.getFirstname(),
        userEntity.getSurname(),
        userEntity.getAvatar() != null && userEntity.getAvatar().length > 0
            ? new String(userEntity.getAvatar(), StandardCharsets.UTF_8)
            : null,
        friendStatus
    );
  }
}

