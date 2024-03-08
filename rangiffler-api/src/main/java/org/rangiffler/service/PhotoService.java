package org.rangiffler.service;


import jakarta.annotation.Nonnull;
import org.rangiffler.data.PhotoEntity;
import org.rangiffler.data.UserEntity;
import org.rangiffler.data.repository.CountryRepository;
import org.rangiffler.data.repository.PhotoRepository;
import org.rangiffler.data.repository.UserRepository;
import org.rangiffler.ex.NotFoundException;
import org.rangiffler.model.PhotoJson;
import org.rangiffler.model.gql.PhotoGql;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Service
public class PhotoService {

  private final PhotoRepository photoRepository;
  private final UserRepository userRepository;
  private final CountryRepository countryRepository;

  @Autowired
  public PhotoService(PhotoRepository photoRepository, UserRepository userRepository, CountryRepository countryRepository) {
    this.photoRepository = photoRepository;
    this.userRepository = userRepository;
    this.countryRepository = countryRepository;
  }

  @Transactional
  public PhotoJson addPhoto(@Nonnull String username,
                            @Nonnull PhotoJson photoJson) {
    PhotoEntity photo = new PhotoEntity();
    photo.setPhoto(photoJson.photo() != null ? photoJson.photo().getBytes(StandardCharsets.UTF_8) : null);
    photo.setDescription(photoJson.description());
    photo.setCreatedDate(new Date());

    UserEntity userEntity = getRequiredUser(username);
    userEntity.addPhotos(photo);
    userRepository.save(userEntity);
    return PhotoJson.fromEntity(photo);
  }

  @Transactional(readOnly = true)
  public Slice<PhotoJson> allUserPhotos(@Nonnull String username,
                                        @Nonnull Pageable pageable) {
    UserEntity userEntity = getRequiredUser(username);
    return photoRepository.findByUser(
        userEntity,
        pageable
    ).map(PhotoJson::fromEntity);
  }

  @Transactional(readOnly = true)
  public Slice<PhotoGql> allUserPhotosGql(@Nonnull String username,
                                          @Nonnull Pageable pageable) {
    UserEntity userEntity = getRequiredUser(username);
    return photoRepository.findByUser(
        userEntity,
        pageable
    ).map(PhotoGql::fromEntity);
  }

  @Transactional
  public PhotoJson editPhoto(@Nonnull PhotoJson photoJson) {
    PhotoEntity photoEntity = photoRepository.findById(photoJson.id()).orElseThrow();
    photoEntity.setDescription(photoJson.description());
    photoEntity.setCountry(countryRepository.findByCode(photoJson.countryJson().code()).orElseThrow());
    return PhotoJson.fromEntity(
        photoRepository.save(photoEntity)
    );
  }

  @Transactional(readOnly = true)
  public Slice<PhotoJson> allFriendsPhotos(@Nonnull String username,
                                           @Nonnull Pageable pageable) {
    UserEntity userEntity = getRequiredUser(username);
    return photoRepository.findByUserIn(
        userRepository.findFriends(userEntity),
        pageable
    ).map(PhotoJson::fromEntity);
  }

  @Transactional
  public void deletePhoto(UUID photoId) {
    photoRepository.deleteById(photoId);
  }

  @Nonnull
  UserEntity getRequiredUser(@Nonnull String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new NotFoundException("Can`t find user by username: " + username));
  }
}
