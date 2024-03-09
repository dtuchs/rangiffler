package org.rangiffler.model.type;

import org.rangiffler.data.CountryEntity;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public record CountryGql(
    UUID id,
    String name,
    String code,
    String flag
) {
  public static CountryGql fromEntity(CountryEntity country) {
    return new CountryGql(
        country.getId(),
        country.getName(),
        country.getCode(),
        country.getFlag() != null ? new String(country.getFlag(), StandardCharsets.UTF_8) : null
    );
  }
}
