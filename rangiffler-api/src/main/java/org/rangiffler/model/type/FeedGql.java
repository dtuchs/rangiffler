package org.rangiffler.model.type;

import org.springframework.data.domain.Slice;

import java.util.List;

public record FeedGql(
    String username,
    boolean withFriends,
    Slice<PhotoGql> photos,
    List<StatGql> stat
) {
}
