import { cookies } from './cookies';

// The homepage components (Hero, About, Fan Favorites) read "desc",
// while the Shop reads "description". This keeps both working from
// one list, so the homepage and Shop always show the same cookies.
export const FLAVORS = cookies.map((c) => ({
  ...c,
  desc: c.description,
}));