package rangiffler.service;

import org.springframework.stereotype.Service;
import rangiffler.model.CountryJson;

import java.util.List;
import java.util.UUID;

@Service
public class CountryService {
    public List<CountryJson> getAllCountries() {
        return List.of(
                CountryJson.builder()
                        .id(UUID.randomUUID())
                        .code("ru")
                        .name("Russia")
                        .build(),
                CountryJson.builder()
                        .id(UUID.randomUUID())
                        .code("it")
                        .name("Italy")
                        .build(),
                CountryJson.builder()
                        .id(UUID.randomUUID())
                        .code("de")
                        .name("Germany")
                        .build(),
                CountryJson.builder()
                        .id(UUID.randomUUID())
                        .code("fr")
                        .name("France")
                        .build()
        );
    }
}
