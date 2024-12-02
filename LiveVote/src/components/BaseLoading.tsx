import React from 'react';
import { BaseBlock } from './index';

interface BaseLoadingProps {
  block?: boolean;
  children: React.ReactNode;
}

const BaseLoading: React.FC<BaseLoadingProps> = ({ block, children }) => {
  return block ? <BaseBlock slim>{children}</BaseBlock> : <div>{children}</div>;
};

export default BaseLoading;
