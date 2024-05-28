import React from 'react';

interface VotingComponentProps {
  onVote: (vote: number) => void;
  disabled: boolean;
}

const VotingComponent: React.FC<VotingComponentProps> = ({
  onVote,
  disabled,
}) => {
  const voteOptions = [1, 2, 3, 5, 8, 13, 21];

  return (
    <div>
      {voteOptions.map((vote) => (
        <button key={vote} onClick={() => onVote(vote)} disabled={disabled}>
          {vote}
        </button>
      ))}
    </div>
  );
};

export default VotingComponent;
