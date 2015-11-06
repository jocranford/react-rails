import React from 'react';
import Immutable from 'immutable';

const registeredComponents = new Map();
let ready = false;

function mountComponent(Component, name) {
  $(`[data-react-component="${name}"]`).toArray()
    .map((node) => {
      const props = Immutable.fromJS($(node).data('react-props')).toObject();

      React.render(<Component {...props} />, node);
    });
}

export default function registerComponent(name, Component) {
  if (registeredComponents.has(name)) {
    throw new Error(`registerComponent "${name}" already registered`);
  }
  registeredComponents.set(name, Component);

  if (ready) mountComponent(name, Component);
}

$(() => {
  ready = true;
  registeredComponents.forEach(mountComponent);
});
