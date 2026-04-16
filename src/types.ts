/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Nights',
    artist: 'AI Composer Alpha',
    url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808d304b3.mp3',
    cover: 'https://picsum.photos/seed/neon1/400/400',
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'AI Composer Beta',
    url: 'https://cdn.pixabay.com/audio/2023/05/08/audio_3b3f46f555.mp3',
    cover: 'https://picsum.photos/seed/neon2/400/400',
  },
  {
    id: '3',
    title: 'Digital Dream',
    artist: 'AI Composer Gamma',
    url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a7351b.mp3',
    cover: 'https://picsum.photos/seed/neon3/400/400',
  },
];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}
