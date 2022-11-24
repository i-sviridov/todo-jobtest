import TaskItem from './TaskItem';

export default function TaskList(props) {
  let renderedContent = (
    <p className="text-center">You have no tasks. Try add some!</p>
  );
  if (props.data && props.data.length > 0) {
    renderedContent = props.data.map((item) => {
      return (
        <TaskItem
          data={item}
          key={item.id}
          editTaskHandler={props.editTaskHandler}
          deleteTaskHandler={props.deleteTaskHandler}
        />
      );
    });
  }

  return <article>{renderedContent}</article>;
}
