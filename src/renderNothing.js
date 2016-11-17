import createHelper from './createHelper';

const Nothing = () => null;
Nothing.displayName = 'Nothing';

const renderNothing = () => Nothing;

export default createHelper(renderNothing, 'renderNothing', false, true);
