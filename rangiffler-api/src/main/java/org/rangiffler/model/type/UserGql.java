package org.rangiffler.model.type;

import org.rangiffler.data.UserEntity;
import org.rangiffler.model.FriendStatus;
import org.rangiffler.utils.EncodedBinary;
import org.springframework.data.domain.Slice;

import java.util.UUID;

public record UserGql(
    UUID id,
    String username,
    String firstname,
    String surname,
    String avatar,
    FriendStatus friendStatus,
    Slice<UserGql> friends,
    Slice<UserGql> incomeInvitations,
    Slice<UserGql> outcomeInvitations,
    Slice<PhotoGql> photos,
    CountryGql location
) {
  public static UserGql fromEntity(UserEntity userEntity) {
    return fromEntity(userEntity, null);
  }

  public static UserGql fromEntity(UserEntity userEntity, FriendStatus friendshipStatus) {
    return new UserGql(
        userEntity.getId(),
        userEntity.getUsername(),
        userEntity.getFirstname(),
        userEntity.getSurname(),
        new EncodedBinary(userEntity.getAvatar()).string(),
        friendshipStatus,
        null,
        null,
        null,
        null,
        CountryGql.fromEntity(userEntity.getCountry())
    );
  }
}
