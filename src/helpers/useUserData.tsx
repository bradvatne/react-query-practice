import { useQuery } from "react-query";

export const useUserData = (userId: string) => {
  const userQuery = useQuery(["users", userId], () =>
    fetch(`https://ui.dev/api/courses/react-query/users/${userId}`).then(
      (res) => res.json().catch((err) => console.log(err))
    )
  );
  return userQuery;
};

export default useUserData;
