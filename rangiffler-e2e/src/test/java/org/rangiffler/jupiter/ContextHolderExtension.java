package org.rangiffler.jupiter;

import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

public class ContextHolderExtension implements BeforeEachCallback, AfterEachCallback {

  private static final ThreadLocal<ExtensionContext> holder = new ThreadLocal<>();

  @Override
  public void beforeEach(ExtensionContext context) throws Exception {
    holder.set(context);
  }

  @Override
  public void afterEach(ExtensionContext context) throws Exception {
    holder.remove();
  }

  public static ExtensionContext context() {
    return holder.get();
  }
}
