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
import { useContentPanelStore } from '../../../../../stateProviders/contentPanelStore';

const CookieDetails = () => {
  const { selectedCookie } = useContentPanelStore(({ state }) => ({
    selectedCookie: state.selectedCookie,
  }));

  return (
    <div data-testid="cookie-card" className="h-full">
      {selectedCookie ? (
        <div className="text-xs rounded-lg">
          <p className="font-bold text-granite-gray mb-1 text-semibold">
            Cookie Value
          </p>
          <p className="mb-4 break-words">
            {selectedCookie.parsedCookie.value}
          </p>
          <p className="font-bold text-granite-gray mb-1">Description</p>
          <p>
            {selectedCookie.analytics?.description ||
              'No description available.'}
          </p>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="text-lg font-bold text-granite-gray">
            Select a cookie to preview its details
          </p>
        </div>
      )}
    </div>
  );
};

export default CookieDetails;
