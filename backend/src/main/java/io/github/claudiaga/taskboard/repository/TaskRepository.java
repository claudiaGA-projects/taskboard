package io.github.claudiaga.taskboard.repository;

import io.github.claudiaga.taskboard.entity.Task;
import io.github.claudiaga.taskboard.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectIdOrderByIdAsc(Long projectId);

    List<Task> findByProjectIdAndStatusOrderByIdAsc(Long projectId, TaskStatus status);
}
