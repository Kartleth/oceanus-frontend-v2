import React, { ReactNode } from "react";

interface MainTitleProps {
  children: string;
}

export default function MainTitle({ children }: MainTitleProps) {
  return (
    <div>
      <h1 className="mb-4 mt-2 text-xl font-bold leading-none tracking-tight pt-[60px] text-gray-600 md:text-2xl lg:text-3xl">
        {children}
      </h1>
    </div>
  );
}
