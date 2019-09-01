export function WindowLoaded() {}

export function ResourcesLoaded(resources, tags) {
  this.resources = resources;
  this.tags = tags;
}

export function ResourceSelected(id) {
  this.id = id;
}

export function Breakpoint(isDesktop) {
  this.isDesktop = isDesktop;
}

export function ModalClosed() {}

export function FiltersToggled(open) {
  this.open = open;
}

export function ResourcesFiltered(category, type, checked) {
  this.category = category;
  this.type = type;
  this.checked = checked;
}