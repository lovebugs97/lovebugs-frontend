import { ReactDivProps } from 'html-element-types';
import { FC } from 'react';

type AvatarProps = ReactDivProps & {
  imageSrc: string;
  className?: string | undefined;
};

const Avatar: FC<AvatarProps> = ({ imageSrc, className: _className, ...props }) => {
  const className = [
    'rounded-full border-2 border-gray-200 hover:border-gray-700 hover:scale-110',
    _className ? _className : '',
  ].join(' ');

  return (
    <div
      className={className}
      style={{
        background: imageSrc,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props}
    />
  );
};

export default Avatar;
