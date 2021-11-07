import React from 'react';
import styled from 'styled-components';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const StyledEmoji = styled.div`
  .emoji-picker-react {
    width: auto;
    box-shadow: unset;
  }
`;

export const Emoji = (props) => {
  const { onEmojiClick } = props;
  return (
    <StyledEmoji>
      <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />
    </StyledEmoji>
  );
};
