export type User = {
  id: string;
  name: string;
  online: string;
};

export type socketLoginRes = {
  ok: boolean;
  data: User;
  error: string;
};
