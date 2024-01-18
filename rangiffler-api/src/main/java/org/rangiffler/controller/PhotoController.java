package org.rangiffler.controller;

import org.rangiffler.model.PhotoJson;
import org.rangiffler.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
public class PhotoController {

  private final PhotoService photoService;

  @Autowired
  public PhotoController(PhotoService photoService) {
    this.photoService = photoService;
  }

  @GetMapping("/photos")
  public List<PhotoJson> getPhotosForUser(@AuthenticationPrincipal Jwt principal) {
    return photoService.getAllUserPhotos(
        principal.getClaim("sub")
    );
  }

  @GetMapping("/friends/photos")
  public List<PhotoJson> getAllFriendsPhotos(@AuthenticationPrincipal Jwt principal) {
    return photoService.getAllFriendsPhotos(
        principal.getClaim("sub")
    );
  }

  @PostMapping("/photos")
  public PhotoJson addPhoto(@RequestBody PhotoJson photoJson, @AuthenticationPrincipal Jwt principal) {
    return photoService.addPhoto(
        principal.getClaim("sub"),
        photoJson
    );
  }

  @PatchMapping("/photos/{id}")
  public PhotoJson editPhoto(@RequestBody PhotoJson photoJson) {
    return photoService.editPhoto(photoJson);
  }

  @DeleteMapping("/photos")
  public void deletePhoto(@RequestParam UUID photoId) {
    photoService.deletePhoto(photoId);
  }
}
