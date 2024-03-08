package org.rangiffler.model.gql;

import org.rangiffler.data.UserEntity;
import org.rangiffler.model.FriendStatus;
import org.rangiffler.model.PhotoJson;
import org.springframework.data.domain.Window;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

public record UserGql(UUID id,
                      String username,
                      String firstname,
                      String surname,
                      String avatar,
                      FriendStatus friendStatus,
                      List<UserGql> friends,
                      List<UserGql> incomeInvitations,
                      List<UserGql> outcomeInvitations,
                      Window<PhotoJson> photos,
                      CountryGql location) {
  public static UserGql fromEntity(UserEntity userEntity) {
    return fromEntity(userEntity, null);
  }

  public static UserGql fromEntity(UserEntity userEntity, FriendStatus friendshipStatus) {
    return new UserGql(
        userEntity.getId(),
        userEntity.getUsername(),
        userEntity.getFirstname(),
        userEntity.getSurname(),
        userEntity.getAvatar() != null ? new String(userEntity.getAvatar(), StandardCharsets.UTF_8) : null,
        friendshipStatus,
        null,
        null,
        null,
        null,
        CountryGql.fromEntity(userEntity.getCountry())
    );
  }
}
