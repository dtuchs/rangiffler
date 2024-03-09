package org.rangiffler.model.type;

import org.rangiffler.data.PhotoEntity;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

public record PhotoGql(
    UUID id,
    String src,
    CountryGql country,
    String description,
    Date creationDate,
    LikesGql likes
) {
  public static PhotoGql fromEntity(PhotoEntity photoEntity) {
    return new PhotoGql(
        photoEntity.getId(),
        photoEntity.getPhoto() != null ? new String(photoEntity.getPhoto(), StandardCharsets.UTF_8) : null,
        CountryGql.fromEntity(photoEntity.getCountry()),
        photoEntity.getDescription(),
        photoEntity.getCreatedDate(),
        null
    );
  }
}
