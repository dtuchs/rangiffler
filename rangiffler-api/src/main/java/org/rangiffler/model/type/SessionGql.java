package org.rangiffler.model.type;

import jakarta.annotation.Nonnull;

import java.util.Date;

public record SessionGql(
    String username,
    Date issuedAt,
    Date expiresAt
) {
  public static @Nonnull SessionGql empty() {
    return new SessionGql(null, null, null);
  }
}
