package io.github.claudiaga.taskboard.dto;

import io.github.claudiaga.taskboard.entity.TaskPriority;
import io.github.claudiaga.taskboard.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record TaskRequest(
        @NotBlank
        @Size(max = 150)
        String title,

        @Size(max = 1000)
        String description,

        TaskStatus status,

        TaskPriority priority,

        Instant dueAt
) {
}
