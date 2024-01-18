package org.rangiffler.service;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.FriendsEntity;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.UserRepository;
import org.rangiffler.ex.NotFoundException;
import org.rangiffler.model.FriendStatus;
import org.rangiffler.model.UserJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Transactional
  public @Nonnull
  UserJson update(@Nonnull UserJson user) {
    UserEntity userEntity = getRequiredUser(user.username());
    userEntity.setFirstname(user.firstName());
    userEntity.setSurname(user.lastLame());
    userEntity.setAvatar(user.avatar() != null ? user.avatar().getBytes(StandardCharsets.UTF_8) : null);
    UserEntity saved = userRepository.save(userEntity);
    return UserJson.fromEntity(saved);
  }

  @Transactional
  public @Nonnull
  UserJson getCurrentUser(@Nonnull String username) {
    return UserJson.fromEntity(
        userRepository.findByUsername(username)
            .orElseGet(() -> {
              UserEntity newUser = new UserEntity();
              newUser.setUsername(username);
              return userRepository.save(newUser);
            })
    );
  }

  @Transactional(readOnly = true)
  public @Nonnull
  List<UserJson> allUsers(@Nonnull String username) {
    Set<UserJson> result = new HashSet<>();
    for (UserEntity user : userRepository.findByUsernameNot(username)) {
      List<FriendsEntity> sendInvites = user.getFriends();
      List<FriendsEntity> receivedInvites = user.getInvites();

      if (!sendInvites.isEmpty() || !receivedInvites.isEmpty()) {
        Optional<FriendsEntity> inviteToMe = sendInvites.stream()
            .filter(i -> i.getFriend().getUsername().equals(username))
            .findFirst();

        Optional<FriendsEntity> inviteFromMe = receivedInvites.stream()
            .filter(i -> i.getUser().getUsername().equals(username))
            .findFirst();

        if (inviteToMe.isPresent()) {
          FriendsEntity invite = inviteToMe.get();
          result.add(UserJson.fromEntity(user, invite.isPending()
              ? FriendStatus.INVITATION_RECEIVED
              : FriendStatus.FRIEND));
        }
        if (inviteFromMe.isPresent()) {
          FriendsEntity invite = inviteFromMe.get();
          result.add(UserJson.fromEntity(user, invite.isPending()
              ? FriendStatus.INVITATION_SENT
              : FriendStatus.FRIEND));
        }
      } else {
        result.add(UserJson.fromEntity(user));
      }
    }
    return new ArrayList<>(result);
  }

  @Transactional(readOnly = true)
  public @Nonnull
  List<UserJson> friends(@Nonnull String username, boolean includePending) {
    return getRequiredUser(username)
        .getFriends()
        .stream()
        .filter(fe -> includePending || !fe.isPending())
        .map(fe -> UserJson.fromEntity(fe.getFriend(), fe.isPending()
            ? FriendStatus.INVITATION_SENT
            : FriendStatus.FRIEND))
        .toList();
  }

  @Transactional(readOnly = true)
  public @Nonnull
  List<UserJson> invitations(@Nonnull String username) {
    return getRequiredUser(username)
        .getInvites()
        .stream()
        .filter(FriendsEntity::isPending)
        .map(fe -> UserJson.fromEntity(fe.getUser(), FriendStatus.INVITATION_RECEIVED))
        .toList();
  }

  @Transactional
  public UserJson addFriend(@Nonnull String username, @Nonnull String friendUsername) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity friendEntity = getRequiredUser(friendUsername);

    currentUser.addFriends(true, friendEntity);
    userRepository.save(currentUser);
    return UserJson.fromEntity(friendEntity, FriendStatus.INVITATION_SENT);
  }

  @Transactional
  public @Nonnull
  List<UserJson> acceptInvitation(@Nonnull String username, @Nonnull String invitationUsername) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity inviteUser = getRequiredUser(invitationUsername);

    FriendsEntity invite = currentUser.getInvites()
        .stream()
        .filter(fe -> fe.getUser().getUsername().equals(inviteUser.getUsername()))
        .findFirst()
        .orElseThrow();

    invite.setPending(false);
    currentUser.addFriends(false, inviteUser);
    userRepository.save(currentUser);

    return currentUser
        .getFriends()
        .stream()
        .map(fe -> UserJson.fromEntity(fe.getFriend(), fe.isPending()
            ? FriendStatus.INVITATION_SENT
            : FriendStatus.FRIEND))
        .toList();
  }

  @Transactional
  public @Nonnull
  List<UserJson> declineInvitation(@Nonnull String username, @Nonnull String invitationUsername) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity friendToDecline = getRequiredUser(invitationUsername);

    currentUser.removeInvites(friendToDecline);
    friendToDecline.removeFriends(currentUser);

    userRepository.save(currentUser);
    userRepository.save(friendToDecline);

    return currentUser.getInvites()
        .stream()
        .filter(FriendsEntity::isPending)
        .map(fe -> UserJson.fromEntity(fe.getUser(), FriendStatus.INVITATION_RECEIVED))
        .toList();
  }

  @Transactional
  public @Nonnull
  List<UserJson> removeFriend(@Nonnull String username, @Nonnull String friendUsername) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity friendToRemove = getRequiredUser(friendUsername);

    currentUser.removeFriends(friendToRemove);
    currentUser.removeInvites(friendToRemove);
    friendToRemove.removeFriends(currentUser);
    friendToRemove.removeInvites(currentUser);

    userRepository.save(currentUser);
    userRepository.save(friendToRemove);

    return currentUser
        .getFriends()
        .stream()
        .map(fe -> UserJson.fromEntity(fe.getFriend(), fe.isPending()
            ? FriendStatus.INVITATION_SENT
            : FriendStatus.FRIEND))
        .toList();
  }

  @Nonnull
  UserEntity getRequiredUser(@Nonnull String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new NotFoundException("Can`t find user by username: " + username));
  }
}
