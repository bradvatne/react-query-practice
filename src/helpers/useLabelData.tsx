import { useQuery } from "react-query";

export const useLabelData = () => {
  const labelQuery = useQuery(["label"], () =>
    fetch(`https://ui.dev/api/courses/react-query/labels`).then((res) =>
      res.json()
    )
  );
  console.log(labelQuery.data)
  return labelQuery;
};
