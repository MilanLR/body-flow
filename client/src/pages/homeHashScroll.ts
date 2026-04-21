type HashScrollDocument = {
  getElementById: (id: string) => {
    scrollIntoView: (options?: ScrollIntoViewOptions) => void;
  } | null;
};

export function scrollToHashTarget(
  documentLike: HashScrollDocument,
  hash: string,
) {
  const sectionId = hash.replace(/^#/, "");

  if (!sectionId) {
    return false;
  }

  const element = documentLike.getElementById(sectionId);

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
