package io.github.claudiaga.taskboard.service;

import io.github.claudiaga.taskboard.dto.ProjectRequest;
import io.github.claudiaga.taskboard.dto.ProjectResponse;
import io.github.claudiaga.taskboard.entity.Project;
import io.github.claudiaga.taskboard.exception.ResourceNotFoundException;
import io.github.claudiaga.taskboard.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByCreatedAtDesc()
                                .stream()
                                .map(ProjectResponse::fromEntity)
                                .toList();
    }

    public ProjectResponse findById(Long id) {
        return ProjectResponse.fromEntity(getProjectOrThrow(id));
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project();
        project.setName(request.name());
        project.setDescription(request.description());
        return ProjectResponse.fromEntity(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = getProjectOrThrow(id);
        project.setName(request.name());
        project.setDescription(request.description());
        return ProjectResponse.fromEntity(project);
    }

    @Transactional
    public void delete(Long id) {
        Project project = getProjectOrThrow(id);
        projectRepository.delete(project);
    }

    private Project getProjectOrThrow(Long id) {
        return projectRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Project", id));
    }
}
