package org.rangiffler.model.type;

import org.rangiffler.data.CountryEntity;
import org.rangiffler.utils.BytesAsString;

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
        new BytesAsString(country.getFlag()).string()
    );
  }
}
