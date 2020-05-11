import { showModal } from './modal';
import { createFighterImage } from '../fighterPreview';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  // call showModal function
  const title = `${fighter} WINS!`;
  
  const bodyElement = createElement({
    tagName: 'div',
    className: 'modal-body'
  });

  bodyElement.append(createFighterImage(fighter));
  
  const onClose = () => document.location.reload(true);
  showModal({
    title,
    bodyElement,
    onClose
  });
}
