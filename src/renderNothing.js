import createHelper from 'recompose/createHelper';

const Nothing = () => null;
Nothing.displayName = 'Nothing';

const renderNothing = () => Nothing;

export default createHelper(renderNothing, 'renderNothing', false, true);
