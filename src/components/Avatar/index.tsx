import React from 'react';
import { useSelector } from 'react-redux';
import { colorChar, utfChar } from '@/helpers/utils';
import { Theme } from '@/constants/settings';
import { IMAGES_URL } from '@/config';

export default function Avatar({
  avatar, size, username, rounded, units, align, mono,
}: TAvatar) {
  const theme: Theme = useSelector((state: any) => state.themeReducer.theme);

  const monoColor = theme === Theme.Dark ? '#404040' : '#828282';

  let style = {};
  if (size) {
    style = {
      ...style, height: `${size}${units}`, width: `${size}${units}`, alignSelf: align,
    };
  }
  if (rounded) {
    style = { ...style, borderRadius: '999px' };
  }
  if (avatar) {
    return <img src={IMAGES_URL + avatar} alt="avatar" style={style} />;
  }
  if (username) {
    return (
      <div style={{
        ...style, textAlign: 'center', backgroundColor: mono ? monoColor : colorChar(username),
      }}
      >
        <span
          style={{
            fontSize: `${(size * 2) / 3}${units}`,
            lineHeight: `${size * 1.025}${units}`,
            userSelect: 'none',
            color: 'white',
          }}
          className="avatar-username"
        >
          {utfChar(username)}
        </span>
      </div>
    );
  }
  return <img src="/images/default_avatar.png" alt="avatar" style={style} />;
}

type TAvatar = {
  avatar?: string | null,
  size: number,
  username?: string | null,
  rounded?: boolean,
  units?: string,
  align?: string
  mono?: boolean
};

Avatar.defaultProps = {
  avatar: null,
  username: null,
  rounded: true,
  units: 'px',
  align: 'center',
  mono: false,
};
