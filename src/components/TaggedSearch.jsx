import { useState, useCallback } from "react";
import styled from "styled-components";
import { Tag } from "./Tag";
import { Button } from "./Button";

const TaggedInput = styled.div.attrs({
  className: 'form_taggedInput',
})`
  background-color: #fff;
`;

const Input = styled.input.attrs({
  className: `form_taggedInput_input`,
})`
  outline: 0;
  -webkit-appearance: none;
`;

const SubmitButton = styled(Button).attrs({
  type: 'record',
})``;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 0;
  height: 124px;

  ${TaggedInput} {
    flex: 1 1 auto;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${SubmitButton} {
    flex: 0 0 auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }
`;

export const TaggedSearch = ({
  id,
  className,
  onSubmit,
}) => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyDown = useCallback((evt) => {
    switch (evt.key) {
      case 'Backspace':
        if (value === '') {
          const newTags = tags.slice(0, -1);
          setTags(newTags);
        }
        break;
      default:
    }
  }, [value, tags]);

  const handleChange = useCallback((evt) => {
    setValue(evt.target.value);
  }, []);

  const handleKeyUp = useCallback((evt) => {
    switch (evt.key) {
      case ',':
      case ';': {
        let i;
        for (i = 0; i < value.length; ++i) {
          if (value[i] === ',' || value[i] === ';') {
            break;
          }
        }
        const tag = value.substring(0, i).trim();
        if (tag) {
          const newTags = [...tags, tag];
          setTags(newTags);
          const rest = value.substring(i + 1);
          setValue(rest);
        }
        break;
      }
      case 'Enter': {
        const tag = value.trim();
        if (tag) {
          const newTags = [...tags, tag];
          setTags(newTags);
          setValue('');
        }
        break;
      }
      default:
    }
  }, [value, tags]);

  const handleSubmit = useCallback(() => {
    if (typeof onSubmit !== 'function') return;
    onSubmit(tags);
  }, [onSubmit, tags]);

  return (
    <Container id={id} className={className}>
      <TaggedInput>
        {tags.map((text, i) =>
          <Tag
            key={i}
            onClose={() => {
              const newTags = [
                ...tags.slice(0, i),
                ...tags.slice(i + 1),
              ];
              setTags(newTags);
            }}
          >
            {text}
          </Tag>
        )}
        <Input
          placeholder="請用分號（；）區隔名稱。如：甲；乙；丙"
          value={value}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </TaggedInput>
      <SubmitButton onClick={handleSubmit}>確定搜尋</SubmitButton>
    </Container>
  );
};
