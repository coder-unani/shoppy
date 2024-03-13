import React from "react";

const User = ({ user: { photoURL, displayName } }) => {
  return (
    <div className="flex items-center shrink-0">
      <img
        src={photoURL}
        className="w-10 h-10 rounded-full mr-2"
        alt={displayName}
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
};

export default User;
