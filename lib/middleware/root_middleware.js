import forceMiddleware from './force_diagram_middleware';
import {applyMiddleware} from 'redux';

const RootMiddleware = applyMiddleware(forceMiddleware);

export default RootMiddleware;