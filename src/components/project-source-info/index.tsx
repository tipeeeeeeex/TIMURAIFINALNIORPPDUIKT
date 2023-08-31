import React from 'react';
import { Image, Typography } from '@douyinfe/semi-ui';
import AIOSLOGO from '@/assets/img/AIOS-LOGO.png';

const { Text } = Typography;

const ProjectSourceInfo: React.FC = function ProjectSourceInfo() {
  return (
    <div className="flex flex-col items-center h-full dark:bg-gray-800 pt-32">
      <Image preview={false} height="200" width="200" src={AIOSLOGO} />

    </div>
  );
};
export default ProjectSourceInfo;
