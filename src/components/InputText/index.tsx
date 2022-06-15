import { InputHTMLAttributes, useState } from "react";

import styles from "./styles.module.scss";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  iconPath?: string;
}

export function InputText({ iconPath, className, ...props }: InputTextProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`${styles.container} ${className} ${
        isFocused && styles.hasFocus
      }`}
    >
      {!!iconPath && <img src={iconPath} alt="Search icon" />}
      <input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
