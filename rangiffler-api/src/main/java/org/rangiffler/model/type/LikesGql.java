package org.rangiffler.model.type;

import java.util.List;

public record LikesGql(
    int total,
    List<LikeGql> likes
) {
}
