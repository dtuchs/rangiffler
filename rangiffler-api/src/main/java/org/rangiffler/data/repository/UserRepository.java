package org.rangiffler.data.repository;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

  Optional<UserEntity> findByUsername(@Nonnull String username);

  List<UserEntity> findByUsernameNot(String username);
}
