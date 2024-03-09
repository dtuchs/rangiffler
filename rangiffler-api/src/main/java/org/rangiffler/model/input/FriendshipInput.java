package org.rangiffler.model.input;

import org.rangiffler.model.FriendshipAction;

import java.util.UUID;

public record FriendshipInput(
    UUID user,
    FriendshipAction action
) {
}
