# ---------- Stage 1: build the jar ----------
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Gradle wrapper and build files first (cached unless they change)
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon

# Source code last (changes most often)
COPY src src
RUN ./gradlew bootJar --no-daemon

# ---------- Stage 2: run the jar ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Run as a non-root user
RUN groupadd --system spring && useradd --system --gid spring spring
USER spring

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
