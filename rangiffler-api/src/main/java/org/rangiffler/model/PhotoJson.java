package org.rangiffler.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.rangiffler.data.PhotoEntity;

import java.util.UUID;

import static java.nio.charset.StandardCharsets.UTF_8;

public record PhotoJson(
  @JsonProperty("id")
  UUID id,
  @JsonProperty("country")
  CountryJson countryJson,
  @JsonProperty("photo")
  String photo,
  @JsonProperty("description")
  String description,
  @JsonProperty("username")
  String username
) {

  public static PhotoJson fromEntity(PhotoEntity photoEntity) {
    return new PhotoJson(
        photoEntity.getId(),
        CountryJson.fromEntity(photoEntity.getCountry()),
        convertPhoto(photoEntity.getPhoto()),
        photoEntity.getDescription(),
        photoEntity.getUser().getUsername()
    );
  }

  private static String convertPhoto(byte[] photo) {
    if (photo != null && photo.length > 0) {
      return new String(photo, UTF_8);
    } else return null;
  }
}
