package io.github.claudiaga.taskboard.dto;

import io.github.claudiaga.taskboard.entity.Project;

import java.time.Instant;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        Instant createdAt
) {
    public static ProjectResponse fromEntity(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getCreatedAt()
        );
    }
}
