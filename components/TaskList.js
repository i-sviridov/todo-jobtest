import TaskItem from './TaskItem';

export default function TaskList(props) {
  let renderedContent = <p>You have no tasks. Try add some!</p>;
  if (props.data) {
    renderedContent = props.data.map((item) => {
      return <TaskItem data={item} />;
    });
  }

  return <article>{renderedContent}</article>;
}
