import React from 'react';


const ErrorComponent: React.FC = () => {
  return (
    <div className="flex items-start justify-center w-full h-1/2">
      <img
        src="/src/assets/error_de_carga.svg"
        alt="Error de carga"
        className="max-w-xs max-h-64 w-auto h-auto"
      />
    </div>
  );
};

export default ErrorComponent;
