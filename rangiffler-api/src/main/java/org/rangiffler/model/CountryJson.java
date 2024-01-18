package org.rangiffler.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.rangiffler.data.CountryEntity;

import java.util.UUID;

public record CountryJson(
    @JsonProperty("id") UUID id,
    @JsonProperty("code")
    String code,
    @JsonProperty("name")
    String name
) {
  public static CountryJson fromEntity(CountryEntity countryEntity) {
    return new CountryJson(
        countryEntity.getId(),
        countryEntity.getCode(),
        countryEntity.getName()
    );
  }
}
