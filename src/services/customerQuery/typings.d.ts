declare namespace API {
  type ListResponse<T> = {
    code: string;
    data?: {
      count: number;
      page: number;
      pageSize: number;
      list: T[]
    };
    message?: string;
  };

  type ListParams<T> = { page: number; pageSize: number;} & T;

  type Response<T> = {
    code: string;
    data?: T;
    message?: string;
  };

}
