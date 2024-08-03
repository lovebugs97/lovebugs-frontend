import { ReactDivProps } from 'html-element-types';
import { FC } from 'react';

type AvatarProps = ReactDivProps & {
  imageSrc: string;
  className?: string | undefined;
};

const Avatar: FC<AvatarProps> = ({ imageSrc, className: _className, ...props }) => {
  const className = ['avatar border-gray-200 hover:border-gray-700 hover:scale-110', _className ? _className : ''].join(
    ' ',
  );

  return (
    <div className={className} {...props}>
      <div className="rounded-full ring ring-offset-2">
        <img src={imageSrc} alt="Profile Image" />
      </div>
    </div>
  );
};

export default Avatar;
