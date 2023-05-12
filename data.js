import { v4 as uuidv4 } from 'uuid';

export const defaultIssue = {
  id: "issue_1",
  title: "Test Issue",
  number: 1,
  status: "inProgress",
  assignee: "u_2",
  comments: ["comment_1"],
  createdBy: "u_1",
  createdDate: new Date(),
  labels: [{ id: "1", name: "bug", color: "red" }],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomIssues(titleArr, numberArr, statusArr, assigneeArr, commentsArr, createdByArr, labelsArr) {
  let randomIssues = [];

  for (let i = 0; i < 20; i++) {
    let randomIssue = { ...defaultIssue };

    randomIssue.id = uuidv4();
    randomIssue.title = getRandomItem(titleArr);
    randomIssue.number = getRandomItem(numberArr);
    randomIssue.status = getRandomItem(statusArr);
    randomIssue.assignee = getRandomItem(assigneeArr);
    randomIssue.comments = getRandomItem(commentsArr);
    randomIssue.createdBy = getRandomItem(createdByArr);
    randomIssue.createdDate = new Date();
    randomIssue.labels = getRandomItem(labelsArr);

    randomIssues.push(randomIssue);
  }

  return randomIssues;
}