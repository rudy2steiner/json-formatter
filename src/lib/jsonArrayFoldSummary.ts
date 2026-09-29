type EditorModel = {
  getLineCount: () => number;
  getLineContent: (lineNumber: number) => string;
  getLineMaxColumn: (lineNumber: number) => number;
  getOffsetAt: (position: {lineNumber: number; column: number}) => number;
  getPositionAt: (offset: number) => {lineNumber: number; column: number};
  getValue: () => string;
};

type FoldEditor = {
  getModel: () => EditorModel | null;
  getVisibleRanges: () => {startLineNumber: number; endLineNumber: number}[];
  deltaDecorations: (oldDecorations: string[], newDecorations: object[]) => string[];
  setHiddenAreas: (ranges: {startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number}[], source?: object) => void;
  onDidChangeHiddenAreas: (listener: () => void) => {dispose: () => void};
  onDidChangeModelContent: (listener: () => void) => {dispose: () => void};
  onDidDispose: (listener: () => void) => {dispose: () => void};
};

type ArrayFold = {
  length: number;
  bracketColumn: number;
  closeLine: number;
  hideCloseLine: boolean;
  trailingComma: boolean;
};

function collapsedStartLines(lineCount: number, visibleRanges: {startLineNumber: number; endLineNumber: number}[]) {
  const starts: number[] = [];
  let expected = 1;
  for (const range of visibleRanges) {
    if (range.startLineNumber > expected) {
      starts.push(expected - 1);
    }
    expected = range.endLineNumber + 1;
  }
  if (expected <= lineCount) {
    starts.push(expected - 1);
  }
  return starts.filter((line) => line >= 1);
}

function arrayFoldFromLine(model: EditorModel, startLine: number): ArrayFold | null {
  const line = model.getLineContent(startLine);
  const bracketIndex = line.lastIndexOf('[');
  if (bracketIndex < 0) {
    return null;
  }
  const text = model.getValue();
  const start = model.getOffsetAt({lineNumber: startLine, column: bracketIndex + 1});
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < text.length; index++) {
    const char = text[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '[' || char === '{') {
      depth += 1;
    } else if (char === ']' || char === '}') {
      depth -= 1;
      if (depth === 0 && char === ']') {
        let value: unknown;
        try {
          value = JSON.parse(text.slice(start, index + 1));
        } catch {
          return null;
        }
        if (!Array.isArray(value)) {
          return null;
        }
        const close = model.getPositionAt(index);
        const closeLineText = model.getLineContent(close.lineNumber);
        const hideCloseLine = close.lineNumber > startLine && /^\s*\],?\s*$/.test(closeLineText);
        return {
          length: value.length,
          bracketColumn: bracketIndex + 1,
          closeLine: close.lineNumber,
          hideCloseLine,
          trailingComma: hideCloseLine && /^\s*,/.test(closeLineText.slice(close.column)),
        };
      }
    }
  }
  return null;
}

export function attachJsonArrayFoldSummary(editor: FoldEditor) {
  const hiddenSource = {};
  let decorationIds: string[] = [];
  let timer = 0;

  const update = () => {
    const model = editor.getModel();
    if (!model) {
      decorationIds = editor.deltaDecorations(decorationIds, []);
      editor.setHiddenAreas([], hiddenSource);
      return;
    }
    const hiddenLines: number[] = [];
    const decorations = collapsedStartLines(model.getLineCount(), editor.getVisibleRanges()).flatMap((startLine) => {
      const fold = arrayFoldFromLine(model, startLine);
      if (!fold) {
        return [];
      }
      if (fold.hideCloseLine) {
        hiddenLines.push(fold.closeLine);
      }
      const line = model.getLineContent(startLine);
      const bracketOnly = /^\s*$/.test(line.slice(fold.bracketColumn));
      const items = [
        {
          range: {
            startLineNumber: startLine,
            startColumn: fold.bracketColumn,
            endLineNumber: startLine,
            endColumn: bracketOnly ? model.getLineMaxColumn(startLine) : fold.bracketColumn + 1,
          },
          options: {
            description: 'json-array-fold-hide',
            inlineClassName: 'json-array-fold-hide',
          },
        },
        {
          range: {
            startLineNumber: startLine,
            startColumn: fold.bracketColumn,
            endLineNumber: startLine,
            endColumn: fold.bracketColumn,
          },
          options: {
            description: 'json-array-fold-size',
            showIfCollapsed: true,
            after: {
              content: `Array[${fold.length}]`,
              inlineClassName: 'json-array-fold-size',
            },
          },
        },
      ];
      if (fold.trailingComma) {
        items.push({
          range: {
            startLineNumber: startLine,
            startColumn: fold.bracketColumn,
            endLineNumber: startLine,
            endColumn: fold.bracketColumn,
          },
          options: {
            description: 'json-array-fold-comma',
            showIfCollapsed: true,
            after: {
              content: ',',
              inlineClassName: 'json-array-fold-comma',
            },
          },
        });
      }
      return items;
    });
    decorationIds = editor.deltaDecorations(decorationIds, decorations);
    editor.setHiddenAreas(hiddenLines.map((line) => ({
      startLineNumber: line,
      startColumn: 1,
      endLineNumber: line,
      endColumn: 1,
    })), hiddenSource);
  };

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(update, 30);
  };

  const hiddenAreas = editor.onDidChangeHiddenAreas(schedule);
  const content = editor.onDidChangeModelContent(schedule);
  editor.onDidDispose(() => {
    window.clearTimeout(timer);
    hiddenAreas.dispose();
    content.dispose();
    decorationIds = editor.deltaDecorations(decorationIds, []);
    editor.setHiddenAreas([], hiddenSource);
  });
}
