/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import CircleEmpty from '../circle/circleEmpty';

interface MatrixComponentHorizontalProps {
  title: string;
  description: string;
  count: number;
  expand?: boolean;
  containerClasses?: string;
}

const MatrixComponentHorizontal = ({
  title,
  description,
  count,
  expand = false,
  containerClasses,
}: MatrixComponentHorizontalProps) => {
  return (
    <div className={containerClasses}>
      <div className="max-w-[672px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <CircleEmpty />
            <h4 className="font-semibold text-xs">{title}</h4>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-[100px] h-1 bg-light-gray" />
            <div className="text-xs text-dark-gray font-semibold">{count}</div>
          </div>
        </div>
        <div className="mt-2 ml-6 pl-px">
          {description && expand && <p className="text-xs">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default MatrixComponentHorizontal;
