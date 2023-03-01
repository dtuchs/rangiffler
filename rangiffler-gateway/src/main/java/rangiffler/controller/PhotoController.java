package rangiffler.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import rangiffler.model.PhotoJson;

import java.util.List;

@RestController
public class PhotoController {

    @GetMapping("/photos/{userId}")
    public List<PhotoJson> getPhotosByUserId(@PathVariable int userId) {
        return null;
    }

    @PostMapping("/photos")
    public void addPhoto(@RequestBody PhotoJson photoJson) {

    }
}
