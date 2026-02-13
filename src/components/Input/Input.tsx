import React, { useState, useRef, useEffect } from 'react';
import './Input.css';
import { CircleX, Eye, EyeOff } from 'lucide-react';


export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  clearable?: boolean;
  label?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  clearable = false,
  label,
  error,
  success,
  fullWidth = false,
  className = '',
  value,
  onChange,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  // internal state with controlled value while mounting component
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);


  //change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(e);
  };


  //clear input handler
  const handleClear = () => {
    const event = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    
    setInternalValue('');
    onChange?.(event);
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasValue = String(internalValue).length > 0;

  return (
    <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''} ${className}`}>
      {label && (
        <label className={`input-label ${isFocused || hasValue ? 'input-label--active' : ''}`}>
          {label}
        </label>
      )}
      <div
        className={`input-container ${isFocused ? 'input-container--focused' : ''} ${
          error ? 'input-container--error' : ''
        } ${success ? 'input-container--success' : ''}`}
      >
        <input
          ref={inputRef}
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input-field"
          {...props}
        />
        <div className="input-actions">
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="input-action-btn"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff />
              ) : (
                <Eye/>
              )}
            </button>
          )}
          {clearable && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="input-action-btn input-clear-btn"
              aria-label="Clear input"
              tabIndex={-1}
            >
              <CircleX />
            </button>
          )}
        </div>
      </div>
      {error && <div className="input-message input-message--error">{error}</div>}
      {/* hardcode is bad so use i18n for internationalization */}
      {success && !error && <div className="input-message input-message--success">Looks good!</div>}
    </div>
  );
};
