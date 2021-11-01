import { default as pkg } from '../../package.json';

export const getVersion = () => {
  return pkg.version;
};
