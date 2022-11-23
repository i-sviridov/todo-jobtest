import { SERVER_PROPS_ID } from 'next/dist/shared/lib/constants';

export default function TaskList(props) {
  return <article>{props.data}</article>;
}
