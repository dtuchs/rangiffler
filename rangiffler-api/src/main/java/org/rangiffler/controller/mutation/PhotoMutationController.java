package org.rangiffler.controller.mutation;

import org.rangiffler.model.input.PhotoInput;
import org.rangiffler.model.type.PhotoGql;
import org.rangiffler.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class PhotoMutationController {

  private final PhotoService photoService;

  @Autowired
  public PhotoMutationController(PhotoService photoService) {
    this.photoService = photoService;
  }

  @MutationMapping
  public PhotoGql photo(@AuthenticationPrincipal Jwt principal,
                        @Argument PhotoInput photoInput) {
    String username = principal.getClaim("sub");
    if (isNewPhoto(photoInput)) {
      return photoService.addPhoto(username, photoInput);
    } else if (isExistingPhoto(photoInput)) {
      return photoService.editPhoto(username, photoInput);
    } else throw new IllegalArgumentException("PhotoInput is invalid");
  }

  @MutationMapping
  public void deletePhoto(@AuthenticationPrincipal Jwt principal, @Argument UUID photoId) {
    String username = principal.getClaim("sub");
    photoService.deletePhoto(username, photoId);
  }

  private boolean isNewPhoto(PhotoInput photoInput) {
    return photoInput.id() == null && (photoInput.src() != null && !photoInput.src().isEmpty())
        && photoInput.country() != null;
  }

  private boolean isExistingPhoto(PhotoInput photoInput) {
    return photoInput.id() != null;
  }
}
