import { render } from 'https://esm.sh/preact@10.7.2';
import { html } from 'https://esm.sh/htm@3.0.4/preact';
import Todo from './todo.js'

render(html`
<div class="app" class="min-w-screen min-h-screen">
  <${Todo} />
</div>
`, document.body);