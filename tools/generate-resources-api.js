const marked = require('marked');
const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');
const resourcesDir = path.resolve(__dirname, '../resources');
const dist = path.resolve(__dirname, '../');

const renderer = new marked.Renderer();

renderer.link = function(href, title, link) {
  return `<a href="${href}" target="_blank">${link}</a>`;
};

fs.readdir(resourcesDir, (err, files) => {
  const api = {};

  files.forEach(fileName => {
    const file = fs.readFileSync(`${resourcesDir}/${fileName}`);
    const frontMatter = matter(file);
    const id = frontMatter.data.title
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[:'\.?,]/g, '');
    api.resources = {
      ...api.resources,
      [id]: {
        id,
        ...frontMatter.data,
        content: marked(frontMatter.content, { renderer }),
      },
    };
  });

  api.tags = [
    ...new Set(
      Object.keys(api.resources).reduce(
        (acc, val) => acc.concat(api.resources[val].tags),
        [],
      ),
    ),
  ].sort();

  fs.writeFileSync(`${dist}/api.json`, JSON.stringify(api), 'utf8');
});
