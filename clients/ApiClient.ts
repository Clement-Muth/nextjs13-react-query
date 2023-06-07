import ky from "ky";

export const apiClient = ky.create({
  retry: 0,
  hooks: {
    beforeRequest: [],
    beforeError: [],
    afterResponse: []
  }
});
