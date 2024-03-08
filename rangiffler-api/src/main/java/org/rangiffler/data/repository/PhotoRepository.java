package org.rangiffler.data.repository;

import jakarta.annotation.Nonnull;
import org.rangiffler.data.PhotoEntity;
import org.rangiffler.data.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PhotoRepository extends JpaRepository<PhotoEntity, UUID> {

  Slice<PhotoEntity> findByUser(@Nonnull UserEntity user,
                                @Nonnull Pageable pageable);

  List<PhotoEntity> findByUser(@Nonnull UserEntity user);

  Slice<PhotoEntity> findByUserIn(@Nonnull List<UserEntity> users,
                                  @Nonnull Pageable pageable);
}
