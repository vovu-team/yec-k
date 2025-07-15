export const GET = async () => {
  const data = {
    env: process.env.NODE_ENV,
    db_access: process.env.DB_ACCESS,
    db_name: process.env.DB_NAME,
  };

  return Response.json(data);
};
