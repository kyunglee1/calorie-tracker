import { SIGNAL_DUPLICATE } from './types';

const signalDuplicate = (id) => ({ type: SIGNAL_DUPLICATE, payload: id });

export default signalDuplicate;
