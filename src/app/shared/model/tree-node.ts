export type TreeNode<T> = {
  key: string;
  label: string;
  data: T;
  children?: TreeNode<T>[];
  parent?: TreeNode<T>;
};
