import { END_SIGNAL } from './types';

const endSignal = (id) => ({ type: END_SIGNAL, payload: id });

export default endSignal;
