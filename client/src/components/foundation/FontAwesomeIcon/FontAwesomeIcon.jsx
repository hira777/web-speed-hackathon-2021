import React from 'react';

import HomeIcon from '../../../assets/svgs/icons/home-solid.svg';
import CalenderAltIcon from '../../../assets/svgs/icons/calendar-alt-regular.svg';
import VideoIcon from '../../../assets/svgs/icons/video-solid.svg';
import MusicIcon from '../../../assets/svgs/icons/music-solid.svg';
import ImagesIcon from '../../../assets/svgs/icons/images-solid.svg';
import CircleNotchIcon from '../../../assets/svgs/icons/circle-notch-solid.svg';
import ExclamationCircleIcon from '../../../assets/svgs/icons/exclamation-circle-solid.svg';
import PlayIcon from '../../../assets/svgs/icons/play-solid.svg';
import PauseIcon from '../../../assets/svgs/icons/pause-solid.svg';
import BalanceScaleIcon from '../../../assets/svgs/icons/balance-scale-solid.svg';
import SignInAltIcon from '../../../assets/svgs/icons/sign-in-alt-solid.svg';
import UserIcon from '../../../assets/svgs/icons/user-solid.svg';
import EditIcon from '../../../assets/svgs/icons/edit-solid.svg';

/**
 * @typedef {object} Props
 * @property {string} iconType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ iconType }) => {
  const className = 'font-awesome inline-block leading-none fill-current';
  if (iconType === 'home') {
    return <HomeIcon className={className} />;
  }
  if (iconType === 'user') {
    return <UserIcon className={className} />;
  }
  if (iconType === 'sign-in-alt') {
    return <SignInAltIcon className={className} />;
  }
  if (iconType === 'balance-scale') {
    return <BalanceScaleIcon className={className} />;
  }
  if (iconType === 'edit') {
    return <EditIcon className={className} />;
  }
  if (iconType === 'pause') {
    return <PauseIcon className={className} />;
  }
  if (iconType === 'play') {
    return <PlayIcon className={className} />;
  }
  if (iconType === 'exclamation-circle') {
    return <ExclamationCircleIcon className={className} />;
  }
  if (iconType === 'circle-notch') {
    return <CircleNotchIcon className={className} />;
  }
  if (iconType === 'images') {
    return <ImagesIcon className={className} />;
  }
  if (iconType === 'music') {
    return <MusicIcon className={className} />;
  }
  if (iconType === 'video') {
    return <VideoIcon className={className} />;
  }
  if (iconType === 'calendar-alt') {
    return <CalenderAltIcon className={className} />;
  }
};

export { FontAwesomeIcon };
