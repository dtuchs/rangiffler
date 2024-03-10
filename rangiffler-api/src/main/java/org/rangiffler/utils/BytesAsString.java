package org.rangiffler.utils;

import jakarta.annotation.Nullable;

import java.nio.charset.StandardCharsets;

public class BytesAsString {
  private final byte[] value;

  public BytesAsString(@Nullable byte[] value) {
    this.value = value;
  }

  public @Nullable String string() {
    return value != null
        ? new String(value, StandardCharsets.UTF_8)
        : null;
  }
}
