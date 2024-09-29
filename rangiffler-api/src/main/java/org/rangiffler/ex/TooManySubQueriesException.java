package org.rangiffler.ex;

public class TooManySubQueriesException extends RuntimeException {
  public TooManySubQueriesException(String message) {
    super(message);
  }
}
