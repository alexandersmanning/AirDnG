import forceMiddleware from './force_diagram_middleware';
import applyMiddlware from 'redux';

const RootMiddleware = applyMiddlware(forceMiddleware);

export default RootMiddleware;