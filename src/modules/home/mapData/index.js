import localImages from '../../../utils/localImages';
import {localStrings} from '../../../utils/localStrings';
const maps = [
  {
    title: localStrings.Standard,
    image: localImages.standard,
    isFocused: true,
  },
  {
    title: localStrings.satellite,
    image: localImages.satellite,
    isFocused: false,
  },
  {
    title: localStrings.terrain,
    image: localImages.terrain,
    isFocused: false,
  },
];
export default maps;
