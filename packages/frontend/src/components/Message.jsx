import React from 'react';

const Message = ({ type, message }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg shadow-md mb-4`}>
      {message}
    </div>
  );
};

export default Message;