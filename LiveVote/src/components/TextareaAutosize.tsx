/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  CSSProperties,
} from 'react';
import { LabelInput } from '.';

interface TextareaAutosizeProps {
  value?: string | number;
  autosize?: boolean;
  minHeight?: number;
  maxHeight?: number;
  maxLength?: number;
  placeholder?: string;
  title?: string;
  information?: string;
  definition?: any;
  isDisabled?: boolean;
  onChange?: (value: string | number) => void;
}

const TextareaAutosize: React.FC<TextareaAutosizeProps> = ({
  value = '',
  autosize = true,
  minHeight = 0,
  maxHeight = 0,
  maxLength = undefined,
  placeholder = '',
  title = '',
  information = '',
  definition = null,
  isDisabled = false,
  onChange,
  ...props
}) => {
  const [val, setVal] = useState<string | number>(value);
  const [maxHeightScroll, setMaxHeightScroll] = useState(false);
  const [height, setHeight] = useState('auto');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const computedStyles = (): CSSProperties => {
    if (minHeight) return { minHeight: `${minHeight}px` };
    if (!autosize) return {};
    return {
      resize: 'none',
      height: height,
      overflow: maxHeightScroll ? 'auto' : 'hidden',
    };
  };

  const resize = () => {
    if (!textareaRef.current) return;

    setHeight('auto');
    setTimeout(() => {
      if (!textareaRef.current) return;
      let contentHeight = textareaRef.current.scrollHeight + 1;

      if (minHeight) {
        contentHeight = Math.max(contentHeight, minHeight);
      }

      if (maxHeight) {
        if (contentHeight > maxHeight) {
          contentHeight = maxHeight;
          setMaxHeightScroll(true);
        } else {
          setMaxHeightScroll(false);
        }
      }

      setHeight(`${contentHeight}px`);
    }, 0);
  };

  useEffect(() => {
    setVal(value);
  }, [value]);

  useEffect(() => {
    resize();
    onChange && onChange(val);
  }, [val]);

  useEffect(() => {
    resize();
  }, [minHeight, maxHeight]);

  useEffect(() => {
    resize();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
  };

  return (
    <div>
      {(title || definition?.title) && (
        <LabelInput information={information}>
          {title || definition.title}
        </LabelInput>
      )}
      <textarea
        ref={textareaRef}
        value={val}
        className={`mt-1 h-auto w-full rounded-3xl border border-skin-border px-4 py-3 focus:border-skin-text ${
          isDisabled ? 'cursor-not-allowed' : ''
        }`}
        style={computedStyles()}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={handleChange}
        onFocus={resize}
        {...props}
      />
    </div>
  );
};

export default TextareaAutosize;
