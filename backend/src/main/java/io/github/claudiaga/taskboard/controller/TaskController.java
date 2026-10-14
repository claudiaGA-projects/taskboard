package io.github.claudiaga.taskboard.controller;

import io.github.claudiaga.taskboard.dto.TaskRequest;
import io.github.claudiaga.taskboard.dto.TaskResponse;
import io.github.claudiaga.taskboard.entity.TaskStatus;
import io.github.claudiaga.taskboard.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/projects/{projectId}/tasks")
    public List<TaskResponse> findByProject(@PathVariable Long projectId, @RequestParam(required = false) TaskStatus status) {
        return taskService.findByProject(projectId, status);
    }

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<TaskResponse> create(@PathVariable Long projectId, @Valid @RequestBody TaskRequest request) {
        TaskResponse created = taskService.create(projectId, request);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                                                  .path("/api/tasks/{id}")
                                                  .buildAndExpand(created.id())
                                                  .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping("/tasks/{id}")
    public TaskResponse findById(@PathVariable Long id) {
        return taskService.findById(id);
    }

    @PutMapping("/tasks/{id}")
    public TaskResponse update(@PathVariable Long id, @Valid @RequestBody TaskRequest request) {
        return taskService.update(id, request);
    }

    @DeleteMapping("/tasks/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}
