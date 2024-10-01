package org.rangiffler.service;

import org.rangiffler.model.type.UserGql;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class FriendRequestSubscription {

  private static final Map<String, Sinks.Many<UserGql>> subscriptions = new ConcurrentHashMap<>();

  public Flux<UserGql> subscribeToFriendRequests(String userId) {
    Sinks.Many<UserGql> sink = Sinks.many().multicast().onBackpressureBuffer();
    subscriptions.put(userId, sink);
    return sink.asFlux();
  }

  public void addFriendRequest(String targetUserId, UserGql incomeInvitation) {
    Sinks.Many<UserGql> sink = subscriptions.get(targetUserId);
    if (sink != null) {
      sink.tryEmitNext(incomeInvitation);
    }
  }
}
