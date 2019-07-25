const marked = require('marked');
const matter = require('gray-matter');
const fs = require('fs');
const path = require('path')
const resourcesDir = path.resolve(__dirname, '../resources');
const dist = path.resolve(__dirname, '../')

fs.readdir(resourcesDir, (err, files) => {
  const api = {};

  files.forEach(fileName => {
    const file = fs.readFileSync(`${resourcesDir}/${fileName}`);
    const frontMatter = matter(file);
    const id = frontMatter.data.title
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(':', '')
      .replace("'", '');
    api.resources = {
      ...api.resources,
      [id]: {
        id,
        ...frontMatter.data,
        content: marked(frontMatter.content),
      }
    }
  });

  api.tags = [
    ...new Set(
      ...Object.keys(api.resources).map(id => api.resources[id].tags),
    ),
  ];

  fs.writeFileSync(`${dist}/api.json`, JSON.stringify(api), 'utf8');
});
