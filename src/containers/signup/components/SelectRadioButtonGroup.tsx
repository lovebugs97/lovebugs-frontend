import { ChangeEvent, FC } from 'react';
import ImageRadioButton from '../../../components/button/ImageRadioButton.tsx';

type SelectRadioButtonGroupProps = {
  gender: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SelectRadioButtonGroup: FC<SelectRadioButtonGroupProps> = ({ gender, onChange }) => {
  return (
    <section className="flex items-center justify-center">
      <ImageRadioButton
        src="./src/assets/images/man.png"
        alt="man"
        title="남성"
        name="man"
        checked={gender === 1}
        onChange={onChange}
      />

      <ImageRadioButton
        src="./src/assets/images/woman.png"
        alt="woman"
        title="여성"
        name="woman"
        checked={gender === 0}
        onChange={onChange}
      />
    </section>
  );
};

export default SelectRadioButtonGroup;
