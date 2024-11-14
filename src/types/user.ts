interface User {
  id: number;
  name: string;
  avatar: string;
  biography: string;
}

interface UserQuery {
  endpoint: string;
  skip: number;
  limit: number;
  orderBy: string;
  orderByDirection: string;
}
