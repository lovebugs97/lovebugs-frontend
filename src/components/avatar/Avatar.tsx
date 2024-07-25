import { ReactDivProps } from 'html-element-types';
import { FC } from 'react';

type AvatarProps = ReactDivProps & {
  imageSrc: string | null;
  className?: string | undefined;
};

const Avatar: FC<AvatarProps> = ({ imageSrc, className: _className, ...props }) => {
  const className = ['', _className ? _className : ''].join();

  return (
    <div
      className={className}
      style={{
        background: imageSrc ? "url('" + imageSrc + "')" : `url(./src/assets/images/user.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...props}
    />
  );
};

export default Avatar;
