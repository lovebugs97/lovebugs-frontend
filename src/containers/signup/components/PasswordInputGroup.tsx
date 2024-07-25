import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import { ChangeEvent, MouseEvent, FC, useState } from 'react';

type PasswordInputGroupProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>, key: 'password' | 'passwordCheck') => void;
};

const PasswordInputGroup: FC<PasswordInputGroupProps> = ({ onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';
  const inputClassName = 'w-[400px] h-16 input input-bordered';

  const handleShowPwBtn = (e: MouseEvent<HTMLButtonElement>) => {
    // form 태그로 이벤트 전파를 막기 위해 디폴트 이벤트 금지
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex gap-16 items-center">
        <input
          type={inputType}
          name="password"
          placeholder="Password"
          className={inputClassName}
          onChange={(e) => onChange(e, 'password')}
        />

        <button className="text-4xl" onClick={handleShowPwBtn}>
          {inputType === 'text' ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
        </button>
      </div>

      <input
        type={inputType}
        name="passwordCheck"
        placeholder="Password Check"
        className={inputClassName}
        onChange={(e) => onChange(e, 'passwordCheck')}
      />
    </>
  );
};

export default PasswordInputGroup;
