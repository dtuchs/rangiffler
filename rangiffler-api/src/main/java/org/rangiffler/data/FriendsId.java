package org.rangiffler.data;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
public class FriendsId implements Serializable {

  private UUID user;
  private UUID friend;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    FriendsId friendsId = (FriendsId) o;
    return Objects.equals(user, friendsId.user) && Objects.equals(friend, friendsId.friend);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, friend);
  }
}
