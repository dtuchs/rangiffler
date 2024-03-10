package org.rangiffler.data.repository;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

  Optional<UserEntity> findByUsername(@Nonnull String username);

  Slice<UserEntity> findByUsernameNot(@Nonnull String username,
                                      @Nonnull Pageable pageable);

  @Query("select u from UserEntity u where u.username <> :username" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  Slice<UserEntity> findByUsernameNotAndSearchQuery(@Param("username") String username,
                                                    @Nonnull Pageable pageable,
                                                    @Param("searchQuery") String searchQuery);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.ACCEPTED and f.requester = :requester")
  Slice<UserEntity> findFriends(@Param("requester") UserEntity requester,
                                @Nonnull Pageable pageable);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.ACCEPTED and f.requester = :requester" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  Slice<UserEntity> findFriends(@Param("requester") UserEntity requester,
                                @Nonnull Pageable pageable,
                                @Param("searchQuery") String searchQuery);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.ACCEPTED and f.requester = :requester")
  List<UserEntity> findFriends(@Param("requester") UserEntity requester);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.ACCEPTED and f.requester = :requester" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  Slice<UserEntity> findFriends(@Param("requester") UserEntity requester,
                                @Param("searchQuery") String searchQuery);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.requester = :requester")
  Slice<UserEntity> findOutcomeInvitations(@Param("requester") UserEntity requester,
                                           @Nonnull Pageable pageable);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.requester = :requester" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  Slice<UserEntity> findOutcomeInvitations(@Param("requester") UserEntity requester,
                                           @Nonnull Pageable pageable,
                                           @Param("searchQuery") String searchQuery);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.requester = :requester")
  List<UserEntity> findOutcomeInvitations(@Param("requester") UserEntity requester);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.addressee" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.requester = :requester" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  List<UserEntity> findOutcomeInvitations(@Param("requester") UserEntity requester,
                                          @Param("searchQuery") String searchQuery);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.requester" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.addressee = :addressee")
  Slice<UserEntity> findIncomeInvitations(@Param("addressee") UserEntity addressee,
                                          @Nonnull Pageable pageable);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.requester" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.addressee = :addressee" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  Slice<UserEntity> findIncomeInvitations(@Param("addressee") UserEntity addressee,
                                          @Nonnull Pageable pageable,
                                          @Param("searchQuery") String searchQuery);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.requester" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.addressee = :addressee")
  List<UserEntity> findIncomeInvitations(@Param("addressee") UserEntity addressee);

  @Query("select u from UserEntity u join FriendshipEntity f on u = f.requester" +
      " where f.status = org.rangiffler.data.FriendshipStatus.PENDING and f.addressee = :addressee" +
      " and (u.username like %:searchQuery% or u.firstname like %:searchQuery% or u.surname like %:searchQuery%)")
  List<UserEntity> findIncomeInvitations(@Param("addressee") UserEntity addressee,
                                         @Param("searchQuery") String searchQuery);

}
