import getDictionary from './getDictionary';

export default function solver(customDictionary = []) {
  if(!Array.isArray(customDictionary)) {
    throw('Custom dictionary should be an array with at least one value');
  }

  const isCustomDict = customDictionary.length > 0;
  const dictionary = isCustomDict ? customDictionary : getDictionary();

  return {
    solve() {

    }
  };
};
