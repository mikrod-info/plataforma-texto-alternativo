class TreeNode {
  constructor({ key, label, level }) {
    this.key = key;
    this.label = label;
    this.level = level;
    this.childrenMap = new Map();
    this.index = null;
    this.posts = [];
  }

  getOrCreateChild(key, label, level) {
    if (!this.childrenMap.has(key)) {
      this.childrenMap.set(key, new TreeNode({ key, label, level }));
    }
    return this.childrenMap.get(key);
  }

  finalize() {
    this.children = [...this.childrenMap.values()]
      .map((node) => node.finalize())
      .sort((a, b) => a.label.localeCompare(b.label, "es"));

    this.totalPosts =
      this.posts.length + this.children.reduce((acc, child) => acc + child.totalPosts, 0);

    delete this.childrenMap;
    return this;
  }
}

function isReadme(file) {
  return file.inputPath.includes("README.md");
}

function getRelativePathUnderPosts(inputPath) {
  const normalizedPath = inputPath.replace(/\\/g, "/");
  const absoluteMarker = "/src/posts/";
  const relativeMarker = "src/posts/";

  const absoluteIndex = normalizedPath.lastIndexOf(absoluteMarker);
  if (absoluteIndex !== -1) {
    return normalizedPath.slice(absoluteIndex + absoluteMarker.length);
  }

  const relativeIndex = normalizedPath.indexOf(relativeMarker);
  if (relativeIndex !== -1) {
    return normalizedPath.slice(relativeIndex + relativeMarker.length);
  }

  return normalizedPath;
}

function buildCatalogTree(collectionApi) {
  const root = new TreeNode({ key: "root", label: "Catalogo", level: "root" });
  const files = collectionApi.getFilteredByGlob("src/posts/**/*.md");

  for (const item of files) {
    const relativePath = getRelativePathUnderPosts(item.inputPath);
    const pathParts = relativePath.split("/").filter(Boolean);
    const fileName = pathParts.pop();

    let node = root;
    pathParts.forEach((segment, index) => {
      const level = index === 0 ? "materia" : index === 1 ? "anio" : "carpeta";
      node = node.getOrCreateChild(segment, segment, level);
    });

    if (fileName === "README.md") {
      node.index = item;
    } else {
      node.posts.push(item);
    }
  }

  return root.finalize().children;
}

export function registerCollections(eleventyConfig) {
  eleventyConfig.addCollection("postIndexes", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/posts/**/*.md").filter(isReadme)
  );

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/posts/**/*.md").filter((file) => !isReadme(file))
  );

  eleventyConfig.addCollection("catalogTree", (collectionApi) => buildCatalogTree(collectionApi));
}
