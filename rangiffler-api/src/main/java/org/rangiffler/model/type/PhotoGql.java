package org.rangiffler.model.type;

import org.rangiffler.data.PhotoEntity;
import org.rangiffler.utils.BytesAsString;

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
        new BytesAsString(photoEntity.getPhoto()).string(),
        CountryGql.fromEntity(photoEntity.getCountry()),
        photoEntity.getDescription(),
        photoEntity.getCreatedDate(),
        null
    );
  }
}
