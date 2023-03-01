package rangiffler.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class PhotoJson {

    @JsonProperty("id")
    private UUID id;

    @JsonProperty("country")
    private CountryJson countryJson;

    @JsonProperty("photo")
    private String photo;

    @JsonProperty("description")
    private String description;
}
