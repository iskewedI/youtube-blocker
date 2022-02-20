import { useEffect, useState } from 'react';
import Input from './Input';

interface EditableTextProps {
  editing?: boolean;
  text?: string;
  onChange?: (newValue: string) => void;
  onSubmit?: (newValue: string) => void;
  onEditStart?: () => void;
  containerStyles?: string;
  enabled?: boolean;
}

const EditableText = ({
  editing = false,
  text = '',
  containerStyles = '',
  enabled = true,
  onChange,
  onSubmit,
  onEditStart,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(editing);
  const [textValue, setTextValue] = useState(text);

  const handleChange = (value: string) => {
    if (onChange && typeof onChange === 'function') {
      onChange(value);
    }
  };

  const handleSubmit = (value: string) => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(value);
    }

    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    if (!enabled) return;

    if (!isEditing === true) {
      if (onEditStart && typeof onEditStart === 'function') {
        onEditStart();
      }
    }

    setIsEditing(editing => !editing);
  };

  useEffect(() => {
    if (editing !== isEditing) {
      setIsEditing(editing);
    }
    if (text !== textValue) {
      setTextValue(text);
    }
  }, [editing, text]);

  return (
    <div className={containerStyles} onDoubleClick={handleDoubleClick}>
      {!isEditing && textValue}
      {isEditing && (
        <Input
          startValue={textValue}
          onChange={handleChange}
          onSubmit={handleSubmit}
          autofocus={true}
          formStyle={text ? { width: `${text.length}ch` } : undefined}
        />
      )}
    </div>
  );
};

export default EditableText;
