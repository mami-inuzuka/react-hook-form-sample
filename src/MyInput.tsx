import { InputHTMLAttributes, forwardRef, useState } from "react";

type MyInputProps = {
  id: string;
  label: string;
};

type Props = MyInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof MyInputProps>;

/**
 * 制御コンポーネントの例
 */
export const MyInput = forwardRef<HTMLInputElement, Props>(({ id, label, ...inputHTMLAttributes }, ref) => {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        ref={ref}
        {...inputHTMLAttributes}
      />
    </>
  );
});
