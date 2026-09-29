import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';

self.MonacoEnvironment = {
  getWorker(_moduleId, label) {
    const name = label === 'json' ? 'json.worker.js' : 'editor.worker.js';
    return new Worker(`/monaco/${name}`);
  },
};

window.monaco = monaco;
