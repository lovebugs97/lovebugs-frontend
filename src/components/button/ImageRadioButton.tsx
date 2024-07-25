import { FC, ChangeEvent } from 'react';

type ImageRadioButtonProps = {
  src: string;
  alt: string;
  title: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ImageRadioButton: FC<ImageRadioButtonProps> = ({ src, alt, title, name, checked, onChange }) => {
  return (
    <label className="cursor-pointer m-8 flex flex-col items-center justify-center">
      <img
        src={src}
        alt={alt}
        className={`w-48 h-48 object-cover p-4 border-2 ${checked ? 'border-gray-300 rounded-3xl' : 'border-transparent'}`}
      />
      <p className="text-center mt-2 mb-2 text-[20px] font-bold text-gray-600">{title}</p>
      <input id="input" name={name} type="radio" checked={checked} onChange={onChange} />
    </label>
  );
};

export default ImageRadioButton;
