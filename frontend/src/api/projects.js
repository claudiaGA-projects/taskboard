import apiClient from './client';

export async function getProjects() {
  const response = await apiClient.get('/projects');
  return response.data;
}

export async function getProject(id) {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
}

export async function createProject(project) {
  const response = await apiClient.post('/projects', project);
  return response.data;
}
