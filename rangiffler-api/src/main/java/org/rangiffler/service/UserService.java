package org.rangiffler.service;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.FriendshipEntity;
import org.rangiffler.data.FriendshipStatus;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.data.repository.UserRepository;
import org.rangiffler.ex.NotFoundException;
import org.rangiffler.model.FriendStatus;
import org.rangiffler.model.input.UserInput;
import org.rangiffler.model.type.UserGql;
import org.rangiffler.utils.DecodedBinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final CountryRepository countryRepository;

  @Autowired
  public UserService(UserRepository userRepository, CountryRepository countryRepository) {
    this.userRepository = userRepository;
    this.countryRepository = countryRepository;
  }

  @Transactional
  public UserGql updateUser(@Nonnull UserInput user) {
    UserEntity userEntity = userRepository.findById(user.id())
        .orElseThrow(() -> new NotFoundException("Can`t find user by id: " + user.id()));

    userEntity.setFirstname(user.firstname());
    userEntity.setSurname(user.surname());
    userEntity.setAvatar(new DecodedBinary(user.avatar()).bytes());

    return UserGql.fromEntity(userRepository.save(userEntity));
  }

  @Transactional
  public @Nonnull
  UserGql currentUser(@Nonnull String username) {
    return UserGql.fromEntity(
        userRepository.findByUsername(username)
            .orElseGet(() -> {
              UserEntity newUser = new UserEntity();
              newUser.setCountry(countryRepository.findByCode("ru").orElseThrow());
              newUser.setUsername(username);
              return userRepository.save(newUser);
            })
    );
  }

  @Transactional(readOnly = true)
  public @Nonnull
  Slice<UserGql> allUsers(@Nonnull String username,
                          @Nonnull Pageable pageable) {
    return userRepository.findByUsernameNot(
        username,
        pageable
    ).map(ue -> {
      List<FriendshipEntity> requests = ue.getFriendshipRequests();
      List<FriendshipEntity> addresses = ue.getFriendshipAddressees();

      if (!requests.isEmpty()) {
        return requests.stream()
            .filter(i -> i.getAddressee().getUsername().equals(username))
            .findFirst()
            .map(
                itm -> UserGql.fromEntity(ue, itm.getStatus() == FriendshipStatus.PENDING
                    ? FriendStatus.INVITATION_RECEIVED
                    : FriendStatus.FRIEND)
            ).orElse(UserGql.fromEntity(ue));
      }
      if (!addresses.isEmpty()) {
        return addresses.stream()
            .filter(i -> i.getRequester().getUsername().equals(username))
            .findFirst()
            .map(
                itm -> UserGql.fromEntity(ue, itm.getStatus() == FriendshipStatus.PENDING
                    ? FriendStatus.INVITATION_SENT
                    : FriendStatus.FRIEND)
            ).orElse(UserGql.fromEntity(ue));
      }
      return UserGql.fromEntity(ue);
    });
  }

  @Transactional(readOnly = true)
  public @Nonnull
  Slice<UserGql> friends(@Nonnull String username,
                         @Nonnull Pageable pageable) {
    return userRepository.findFriends(
            getRequiredUser(username),
            pageable
        )
        .map(f -> UserGql.fromEntity(f, FriendStatus.FRIEND));
  }

  @Transactional(readOnly = true)
  public @Nonnull
  Slice<UserGql> incomeInvitations(@Nonnull String username,
                                   @Nonnull Pageable pageable) {
    return userRepository.findIncomeInvitations(
            getRequiredUser(username),
            pageable
        )
        .map(i -> UserGql.fromEntity(i, FriendStatus.INVITATION_RECEIVED));
  }

  @Transactional(readOnly = true)
  public @Nonnull
  Slice<UserGql> outcomeInvitations(@Nonnull String username,
                                    @Nonnull Pageable pageable) {
    return userRepository.findOutcomeInvitations(
        getRequiredUser(username),
        pageable
    ).map(o -> UserGql.fromEntity(o, FriendStatus.INVITATION_SENT));
  }

  @Transactional
  public void addFriend(@Nonnull String username, @Nonnull UUID friendId) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity friendEntity = getRequiredUser(friendId);
    currentUser.addFriends(FriendshipStatus.PENDING, friendEntity);
    userRepository.save(currentUser);
  }

  @Transactional
  public void acceptInvitation(@Nonnull String username, @Nonnull UUID invitationId) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity inviteUser = getRequiredUser(invitationId);

    FriendshipEntity invite = currentUser.getFriendshipAddressees()
        .stream()
        .filter(fe -> fe.getRequester().getUsername().equals(inviteUser.getUsername()))
        .findFirst()
        .orElseThrow();

    invite.setStatus(FriendshipStatus.ACCEPTED);
    currentUser.addFriends(FriendshipStatus.ACCEPTED, inviteUser);
    userRepository.save(currentUser);
  }

  @Transactional
  public void declineInvitation(@Nonnull String username, @Nonnull UUID invitationId) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity friendToDecline = getRequiredUser(invitationId);

    currentUser.removeInvites(friendToDecline);
    friendToDecline.removeFriends(currentUser);

    userRepository.save(currentUser);
    userRepository.save(friendToDecline);
  }

  @Transactional
  public void removeFriend(@Nonnull String username, @Nonnull UUID friendId) {
    UserEntity currentUser = getRequiredUser(username);
    UserEntity friendToRemove = getRequiredUser(friendId);

    currentUser.removeFriends(friendToRemove);
    currentUser.removeInvites(friendToRemove);
    friendToRemove.removeFriends(currentUser);
    friendToRemove.removeInvites(currentUser);

    userRepository.save(currentUser);
    userRepository.save(friendToRemove);
  }

  @Nonnull
  UserEntity getRequiredUser(@Nonnull String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new NotFoundException("Can`t find user by username: " + username));
  }

  @Nonnull
  UserEntity getRequiredUser(@Nonnull UUID id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Can`t find user by id: " + id));
  }
}
