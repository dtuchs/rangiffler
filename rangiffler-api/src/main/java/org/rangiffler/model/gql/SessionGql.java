package org.rangiffler.model.gql;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nonnull;

import java.util.Date;

public record SessionGql(@JsonProperty("username")
                         String username,
                         @JsonProperty("issuedAt")
                         Date issuedAt,
                         @JsonProperty("expiresAt")
                         Date expiresAt) {
  public static @Nonnull SessionGql empty() {
    return new SessionGql(null, null, null);
  }
}
