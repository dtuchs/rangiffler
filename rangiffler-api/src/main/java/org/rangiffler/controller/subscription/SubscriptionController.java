package org.rangiffler.controller.subscription;

import org.rangiffler.model.type.UserGql;
import org.rangiffler.service.FriendRequestSubscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

@Controller
@PreAuthorize("isAuthenticated()")
public class SubscriptionController {

  private final FriendRequestSubscription friendRequestSubscription;

  @Autowired
  public SubscriptionController(FriendRequestSubscription friendRequestSubscription) {
    this.friendRequestSubscription = friendRequestSubscription;
  }

  /**
   * <pre>
   *   subscription {
   *     incomeFriends(userId: "b3044c10-aa60-40ca-8864-4200287ed7ea") {
   *         username
   *     }
   *   }
   * </pre>
   */
  @SubscriptionMapping
  public Flux<UserGql> incomeFriends(@Argument String userId) {
    return friendRequestSubscription.subscribeToFriendRequests(userId);
  }
}
