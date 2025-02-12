export const generateIdUnique = (prefix: string) => {
  const year = new Date().getFullYear().toString();
  const randomPart = Math.floor(10000 + Math.random() * 90000).toString();

  return `${prefix}${year}${randomPart}`;
};

export const LIC = 'LIC';
export const DOC = 'DOC';
