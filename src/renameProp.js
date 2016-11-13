import omit from 'recompose/utils/omit';
import createHelper from './createHelper';
import mapProps from './mapProps';

const renameProp = (oldName, newName) =>
  mapProps(props => ({
    ...omit(props, [oldName]),
    [newName]: props[oldName],
  }));

export default createHelper(renameProp, 'renameProp');
