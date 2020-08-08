import axios from "axios";
import { useApiHandler, fetcher } from "actions";
import useSWR from "swr";

const createProject = (data) => axios.post("/api/v1/projects", data);
const updateProject = (id, data) => axios.patch(`/api/v1/projects/${id}`, data);
const deleteProject = (id) => axios.delete(`/api/v1/projects/${id}`);

export const useCreateProject = () => useApiHandler(createProject);
export const useUpdateProject = () => useApiHandler(updateProject);
export const useDeleteProject = () => useApiHandler(deleteProject);

export const useGetProject = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/projects/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};
