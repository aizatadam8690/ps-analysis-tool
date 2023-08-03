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

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

// @see https://github.com/tailwindlabs/tailwindcss/issues/4690#issuecomment-1046087220
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  content: ['./packages/extension/src/**/*.{tsx,js}'],
  theme: {
    extend: {},
    fontFamily: {
      ...defaultTheme.fontFamily,
    },
    textColor: {
      ...colors,
      primary: '#000',
      secondary: '#5F5F5F',
      tertiary: '#808080',
      'first-party': '#5FA569',
      'third-party': '#FA752E',
      'chart-label': '#111B21',
      'granite-gray': '#5F6369',
      'outer-space': '#303942',
      'raisin-black': '#212121',
    },
    backgroundColor: {
      ...colors,
      primary: '#FFF',
      secondary: '#E5E7EB',
      tertiary: '#CBD5E1',
      'anti-flash-white': '#F1F3F4',
      gainsboro: '#DADCE0',
      'american-silver': '#CBCDD1',
      'selected-background-color': '#3871E0',
    },
    borderColor: {
      ...colors,
      'american-silver': '#CBCDD1',
    },
  },
};
