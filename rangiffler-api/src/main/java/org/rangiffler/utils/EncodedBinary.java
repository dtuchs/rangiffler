package org.rangiffler.utils;

import jakarta.annotation.Nullable;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class EncodedBinary {
  private final byte[] value;

  public EncodedBinary(@Nullable byte[] value) {
    this.value = value;
  }

  public @Nullable String string() {
    return value != null
        ? new String(Base64.getEncoder().encode(value), StandardCharsets.UTF_8)
        : null;
  }
}
