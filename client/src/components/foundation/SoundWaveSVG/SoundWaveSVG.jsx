import React from 'react';

import { getSoundSvgPath } from '../../../utils/get_path';

/**s
 * @typedef {object} Props
 * @property {string} id
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ id }) => {
  return <img className="w-full h-full" src={getSoundSvgPath(id)} />;
};

export { SoundWaveSVG };
