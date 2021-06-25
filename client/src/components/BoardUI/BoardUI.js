/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Board from './Board';
import initialData from '../../components/BoardUI/initial-data';

export default function BoardUI() {
  return <Board boardData={initialData} />;
}
