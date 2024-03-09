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

  /**
   * Create a new photo:
   * <pre>
   *  mutation photo {
   *    photo(input: {
   *      src: "iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAABPlBMVEVHcEwDUD25GkIASDMAUjwBWUMAPisARjIAVT4AVzwAUTsCVkAATjkBXkYATTi4GkEBXUa9I0mjI0O4GkC6HEUBZk4AzUn/0AAAaEz/zQABZUkAa08AVDwAXEHZGkX/yAD/zADWFT3/wgAAblMAYEYAWD/VEjkAYkj/0QAAUTj/zwDaHkv/xQABXkPXF0EAc1cARTC7GEL/ygD///8AdlvovwO1FToASjXeP2LJG0ZbiS7GFj4AOyhNfS46by5bkDPhSC2OpCMrdTubKT6/lALTrQGmpRiwsRlxkSeGlyDHngD1xM4AQCzaLDDQvg7gqgDsxgXGtA96mijCrg3mcYvktQHskKWiMEmRjBItVyTdOysXdUnwywQjZzW7OC8/hz7iVHXxrr0zfT0NWTb98/X53uT3sQqgmBXuiRfcixJvgMLrAAAAFnRSTlMAIMLXrVy5i8gH7kJm1DCV6iR+r1HVEsrmUgAAAlFJREFUOMtt1HlfokAYwHHySLTStnY/0ggUCrJkosGS5Kpp3qu2Xtmudh97vP83sM8MA9rW7z/5fB2YZxSGgT583Int+ny+3dhOcGONeVs4yIKK+Y7dTuoch9CnQAh82EXRzUCE5xlQp6diJpMRcVdfcqlUglORKsvbW1ssu7WtQFmBZ45PMzhbpJCUy4FGSAWuqojjuKzmwocVmHNKkRKJBECBQvH+Gd9a16/eMuyQUCFQFGfm1LZtSa9eX7RrZ3eL1Cv32J18w/B+1ns2TfPF1vXqZ1Ic+/EZblwbDQ3jEkPR7gEzexldklwYPyTtQQcHhrEP8ARmA3c2TVuSKIzHHegw7Aj8Crt4MHvmjMI4dXvucuBcqL9M9WkPw9ta++LaW85z1o+fGOr2FB7P1qV0uo73urjrgB86tzWsSbec5QsAdV2USGkCE3QmHLc4h5AsZ7OClifQZQCXDCF8hipxFC4dgR4jZ02cQiBxg8F8Ph8M6g5bXQ47RSObqf75ZdCRHFij1rh4zlHmOOGm02gwt38PyeyWE4G97luTVrdTxhW7rctk8nuDaVr/O8OZHe4ISh4lXUjcO4w4zCj0HGWry1HnwmG71iniOt3WyHrHJeEIm5PxozM7dyTovIi9x5q/y0/5ElNB9NeOVkaCZ5K9qeBunnhN0wAq6opbMkEh8ZBGoQx/TFlwrvG8ogivGXGFPkC4Ch8ifpZl/ZGCk6bBV3jqCvl+qbTOKHwksBn13h9rG5uhgD/v1e+D8oeiDMMGw++8lbAPBdahUChIXlv/AKxstxK/9pV0AAAAAElFTkSuQmCC",
   *      description: "Test photo 2"
   *      country: {
   *        code: "us"
   *      }
   *    }) {
   *      id
   *      src
   *      country {
   *        code
   *            name
   *      }
   *      description
   *      creationDate
   *      likes {
   *        total
   *        likes {
   *          user
   *          username
   *          creationDate
   *        }
   *      }
   *    }
   *  }
   * </pre>
   * <p>
   * Update photo:
   * <pre>
   * mutation photo {
   *   photo(input: {
   *     id: "2e1bfe94-fcd2-4d99-b7e9-773d3021ebed",
   *     description: "Updated description"
   *     country: {
   *       code: "es"
   *     }
   *   }) { ... }
   * </pre>
   * <p>
   * Post a like to own photo:
   * <pre>
   * mutation photo {
   *   photo(input: {
   *     id: "2e1bfe94-fcd2-4d99-b7e9-773d3021ebed",
   *     like: {
   *       user: "2e4bc114-c65c-4487-9fb3-dd9da16907ce"
   *     }
   *   }) {
   *     likes {
   *       total
   *       likes {
   *         user
   *         username
   *         creationDate
   *       }
   *     }
   *   }
   * }
   * </pre>
   */
  @MutationMapping
  public PhotoGql photo(@AuthenticationPrincipal Jwt principal,
                        @Argument PhotoInput input) {
    String username = principal.getClaim("sub");
    if (isNewPhoto(input)) {
      return photoService.addPhoto(username, input);
    } else if (isExistingPhoto(input)) {
      return photoService.editPhoto(username, input);
    } else throw new IllegalArgumentException("PhotoInput is invalid");
  }

  /**
   * <pre>
   * mutation deletePhoto {
   *     deletePhoto(id: "2e1bfe94-fcd2-4d99-b7e9-773d3021ebed")
   * }
   * </pre>
   */
  @MutationMapping
  public void deletePhoto(@AuthenticationPrincipal Jwt principal, @Argument UUID id) {
    String username = principal.getClaim("sub");
    photoService.deletePhoto(username, id);
  }

  private boolean isNewPhoto(PhotoInput photoInput) {
    return photoInput.id() == null && (photoInput.src() != null && !photoInput.src().isEmpty())
        && photoInput.country() != null;
  }

  private boolean isExistingPhoto(PhotoInput photoInput) {
    return photoInput.id() != null;
  }
}
