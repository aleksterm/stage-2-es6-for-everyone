import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  const fighterInfoElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___info',
  });

  if (fighter) {
    const { name, health, attack, defense } = fighter;

    Object.entries({ name, health, attack, defense }).forEach((feature) => {
      let elem = createElement({
        tagName: 'span',
        className: 'fighter-preview___feature',
      });

      elem.innerHTML = feature.join(': ');
      fighterInfoElement.append(elem);
    })

    fighterElement.append(createFighterImage(fighter));
  }

  fighterElement.append(fighterInfoElement);
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
