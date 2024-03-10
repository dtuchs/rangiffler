package org.rangiffler.model.type;

import org.rangiffler.data.LikeEntity;

import java.util.Date;
import java.util.UUID;

public record LikeGql(
    UUID user,
    String username,
    Date creationDate
) {
  public static LikeGql fromEntity(LikeEntity likeEntity) {
    return new LikeGql(
        likeEntity.getUser().getId(),
        likeEntity.getUser().getUsername(),
        likeEntity.getCreatedDate()
    );
  }
}
