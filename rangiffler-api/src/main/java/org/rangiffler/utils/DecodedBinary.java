package org.rangiffler.utils;

import jakarta.annotation.Nullable;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class DecodedBinary {
  private final String value;

  public DecodedBinary(@Nullable String value) {
    this.value = value;
  }

  public @Nullable byte[] bytes() {
    return value != null
        ? Base64.getDecoder().decode(value.getBytes(StandardCharsets.UTF_8))
        : null;
  }
}
