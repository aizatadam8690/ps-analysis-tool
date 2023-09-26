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
import { useCookieStore } from '../../stateProviders/syncCookieStore';
import CookiesListing from './cookiesListing';
import {
  Button,
  CookiesLanding,
  ProgressBar,
} from '@cookie-analysis-tool/design-system';
import useFrameOverlay from '../../hooks/useFrameOverlay';

const Cookies = () => {
  const {
    allowedNumberOfTabs,
    contextInvalidated,
    isCurrentTabBeingListenedTo,
    loading,
    returningToSingleTab,
    selectedFrame,
    setInspectedFrame,
    tabCookies,
    tabFrames,
    tabUrl,
    changeListeningToThisTab,
  } = useCookieStore(({ state, actions }) => ({
    allowedNumberOfTabs: state.allowedNumberOfTabs,
    contextInvalidated: state.contextInvalidated,
    isCurrentTabBeingListenedTo: state.isCurrentTabBeingListenedTo,
    loading: state.loading,
    returningToSingleTab: state.returningToSingleTab,
    selectedFrame: state.selectedFrame,
    setInspectedFrame: actions.setInspectedFrame,
    tabCookies: state.tabCookies,
    tabFrames: state.tabFrames,
    tabUrl: state.tabUrl,
    changeListeningToThisTab: actions.changeListeningToThisTab,
  }));

  useFrameOverlay({
    selectedFrame,
    setInspectedFrame,
  });

  if (
    loading ||
    (loading &&
      isCurrentTabBeingListenedTo &&
      allowedNumberOfTabs &&
      allowedNumberOfTabs === 'single')
  ) {
    return (
      <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-raisin-black">
        <ProgressBar additionalStyles="w-full" />
      </div>
    );
  }

  if (
    (isCurrentTabBeingListenedTo &&
      allowedNumberOfTabs &&
      allowedNumberOfTabs === 'single') ||
    (allowedNumberOfTabs && allowedNumberOfTabs === 'unlimited')
  ) {
    return (
      <div
        className={`h-full ${selectedFrame ? '' : 'flex items-center'}`}
        data-testid="cookies-content"
      >
        {selectedFrame ? (
          <CookiesListing />
        ) : (
          <CookiesLanding
            tabCookies={tabCookies}
            tabFrames={tabFrames}
            tabUrl={tabUrl}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-white dark:bg-raisin-black">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {!returningToSingleTab && !contextInvalidated && (
          <p className="dark:text-bright-gray text-chart-label text-base mb-5">
            This tool works best with a single tab.
          </p>
        )}
        {contextInvalidated ? (
          <p className="dark:text-bright-gray text-chart-label text-base mb-5">
            Uh Oh! Looks like extension has been updated since devtools was
            open. Please close and reopen the devtools panel.
          </p>
        ) : (
          <Button onClick={changeListeningToThisTab} text="Analyze this tab" />
        )}
      </div>
    </div>
  );
};

export default Cookies;
