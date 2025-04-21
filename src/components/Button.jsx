import React from 'react';

const Button = ({ 
  title, 
  id, 
  rightIcon, 
  leftIcon, 
  containerClass,
  href,
  download,
  type = 'button',
  ...props 
}) => {
  // Common classes for both button and link variants
  const baseClasses = `group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`;
  
  // If href is provided, render as <a> tag
  if (href) {
    return (
      <a
        id={id}
        href={href}
        download={download}
        className={`${baseClasses} flex items-center justify-center gap-1`}
        {...props}
      >
        {leftIcon}
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          <div>{title}</div>
        </span>
        {rightIcon}
      </a>
    );
  }

  // Otherwise render as regular <button>
  return (
    <button
      id={id}
      type={type}
      className={`${baseClasses} flex items-center justify-center gap-1`}
      {...props}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;