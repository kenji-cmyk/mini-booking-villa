package com.kna.vstay.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SwaggerController {
    @GetMapping(value = "/v3/api-docs", produces = MediaType.APPLICATION_JSON_VALUE)
    public String openApiSpec() throws IOException {
        ClassPathResource resource = new ClassPathResource("openapi/vstay-openapi.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping(value = "/swagger-ui.html", produces = MediaType.TEXT_HTML_VALUE)
    public String swaggerUi() {
        return """
                <!doctype html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title>VStay API - Swagger UI</title>
                  <link rel="stylesheet" href="/webjars/swagger-ui/5.32.5/swagger-ui.css">
                </head>
                <body>
                  <div id="swagger-ui"></div>
                  <script src="/webjars/swagger-ui/5.32.5/swagger-ui-bundle.js"></script>
                  <script>
                    window.onload = function () {
                      window.ui = SwaggerUIBundle({
                        url: "/v3/api-docs",
                        dom_id: "#swagger-ui"
                      });
                    };
                  </script>
                </body>
                </html>
                """;
    }
}
