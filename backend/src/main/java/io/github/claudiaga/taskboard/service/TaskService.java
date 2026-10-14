package io.github.claudiaga.taskboard.service;

import io.github.claudiaga.taskboard.dto.TaskRequest;
import io.github.claudiaga.taskboard.dto.TaskResponse;
import io.github.claudiaga.taskboard.entity.Project;
import io.github.claudiaga.taskboard.entity.Task;
import io.github.claudiaga.taskboard.entity.TaskStatus;
import io.github.claudiaga.taskboard.exception.ResourceNotFoundException;
import io.github.claudiaga.taskboard.repository.ProjectRepository;
import io.github.claudiaga.taskboard.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public List<TaskResponse> findByProject(Long projectId, TaskStatus status) {
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project", projectId);
        }
        List<Task> tasks;
        if (status == null) {
            tasks = taskRepository.findByProjectIdOrderByIdAsc(projectId);
        }else {
            tasks = taskRepository.findByProjectIdAndStatusOrderByIdAsc(projectId, status);
        }
        return tasks.stream().map(TaskResponse::fromEntity).toList();
    }

    public TaskResponse findById(Long id) {
        return TaskResponse.fromEntity(getTaskOrThrow(id));
    }

    @Transactional
    public TaskResponse create(Long projectId, TaskRequest request) {
        Project project = projectRepository.findById(projectId)
                                           .orElseThrow(() -> new ResourceNotFoundException("Project", projectId));
        Task task = new Task();
        applyRequest(task, request);
        task.setProject(project);
        return TaskResponse.fromEntity(taskRepository.save(task));
    }

    @Transactional
    public TaskResponse update(Long id, TaskRequest request) {
        Task task = getTaskOrThrow(id);
        applyRequest(task, request);
        return TaskResponse.fromEntity(task);
    }

    @Transactional
    public void delete(Long id) {
        Task task = getTaskOrThrow(id);
        taskRepository.delete(task);
    }

    private Task getTaskOrThrow(Long id) {
        return taskRepository.findById(id)
                             .orElseThrow(() -> new ResourceNotFoundException("Task", id));
    }

    private void applyRequest(Task task, TaskRequest request) {
        task.setTitle(request.title());
        task.setDescription(request.description());
        if (request.status() != null) {
            task.setStatus(request.status());
        }
        if (request.priority() != null) {
            task.setPriority(request.priority());
        }
        task.setDueAt(request.dueAt());
    }
}
