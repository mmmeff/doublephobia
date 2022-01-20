const makeBundlephobiaUrl = (module: string) => {
  if (/^@?.+@?.+$/.test(module) === false)
    throw new Error("invalid module format: " + module);

  return `https://bundlephobia.com/package/${module}`;
};

export default makeBundlephobiaUrl;
