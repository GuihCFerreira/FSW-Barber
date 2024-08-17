import React from "react";

interface SessionTitleProps {
  title: string;
}

const SessionTitle: React.FC<SessionTitleProps> = ({ title }) => {
  return (
    <>
      <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
        {title}
      </h2>
    </>
  );
};

export default SessionTitle;
