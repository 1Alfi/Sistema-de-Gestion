# ===== Stage 1: Build =====
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /build

# Cache de dependencias
COPY pom.xml .
RUN mvn -B -q -ntp dependency:go-offline

# Código fuente
COPY src ./src

# Empaquetado (sin tests para rapidez; quítalo si quieres correrlos)
RUN mvn -B -q -ntp package -DskipTests

# ===== Stage 2: Runtime =====
FROM eclipse-temurin:17-jre-alpine

# (Opcional) zona horaria
# RUN apk add --no-cache tzdata \
#     && ln -snf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime \
#     && echo America/Argentina/Buenos_Aires > /etc/timezone

WORKDIR /app

# Ajusta el nombre del JAR si tu artifactId/version cambia
COPY --from=build /build/target/sistema-contable-0.0.1-SNAPSHOT.jar app.jar

# Flags de JVM seguros para contenedores (opcional, recomendados)
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport"
# Perfil por defecto; Render lo puede sobreescribir
ENV SPRING_PROFILES_ACTIVE=prod

# No hardcodeamos el puerto aquí; Spring toma $PORT
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]