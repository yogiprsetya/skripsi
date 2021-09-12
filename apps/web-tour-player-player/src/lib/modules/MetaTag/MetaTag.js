import { Module } from 'react-360-web';

export default class MetaTag extends Module {
  constructor() {
    super('HandleMetaTag');
  }

  changeTitleTag(title) {
    document.title = `${title} | Smarteye.id WebVR`;
  }
}