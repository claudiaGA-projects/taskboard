import apiClient from './client';

export async function getProjectTasks(projectId) {
  const response = await apiClient.get(`/projects/${projectId}/tasks`);
  return response.data;
}
