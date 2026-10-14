package io.github.claudiaga.taskboard.dto;

import io.github.claudiaga.taskboard.entity.Task;
import io.github.claudiaga.taskboard.entity.TaskPriority;
import io.github.claudiaga.taskboard.entity.TaskStatus;

import java.time.Instant;

public record TaskResponse(
    Long id,
    String title,
    String description,
    TaskStatus status,
    TaskPriority priority,
    Instant dueAt,
    Long projectId
) {
    public static TaskResponse fromEntity(Task task) {
        return new TaskResponse(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getStatus(),
            task.getPriority(),
            task.getDueAt(),
            task.getProject().getId()
        );
    }
}
