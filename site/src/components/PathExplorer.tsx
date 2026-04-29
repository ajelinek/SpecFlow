import { For, createMemo, createSignal, type Accessor } from 'solid-js';
import type { WorkflowPath } from '../lib/specflow';

interface PathExplorerProps {
  options: WorkflowPath[];
  defaultId?: string;
}

const nodeMeta: Record<string, { label: string; note: string }> = {
  '100': { label: '100 Series', note: 'Project context' },
  '101': { label: '101', note: 'Project overview' },
  '102': { label: '102', note: 'System architecture' },
  '103': { label: '103', note: 'Common data model' },
  '104': { label: '104', note: 'Backend architecture' },
  '105': { label: '105', note: 'Frontend architecture' },
  '106': { label: '106', note: 'UI design' },
  '107': { label: '107', note: 'UI experience' },
  '108': { label: '108 Loop', note: 'Per-page design loop' },
  '110': { label: '110', note: 'Feature backlog map' },
  '201': { label: '201', note: 'Feature overview' },
  '202': { label: '202', note: 'Behavior spec' },
  '203': { label: '203', note: 'Implementation plan' },
  '204': { label: '204', note: 'Readiness review' },
  '301': { label: '301', note: 'Implementation run' },
  '401': { label: '401', note: 'Cleanup pass' },
};

function parseSequence(sequence: string) {
  return sequence
    .split('->')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const key = part.split(' ')[0];
      const meta = nodeMeta[key] ?? { label: part, note: 'Workflow step' };
      return {
        key,
        display: part,
        label: meta.label,
        note: meta.note,
      };
    });
}

type PathNode = ReturnType<typeof parseSequence>[number];

export default function PathExplorer(props: PathExplorerProps) {
  const initialId = props.options.some((option) => option.id === props.defaultId)
    ? props.defaultId
    : props.options[0]?.id ?? '';
  const [activeId, setActiveId] = createSignal(initialId);

  const activePath = createMemo(() => props.options.find((option) => option.id === activeId()) ?? props.options[0]);
  const activeNodes = createMemo(() => parseSequence(activePath()?.sequence ?? ''));

  return (
    <section class="path-explorer" aria-label="SpecFlow path explorer">
      <div class="path-explorer__header">
        <div>
          <p class="eyebrow">Path Explorer</p>
          <h2>Explore the workflow shapes</h2>
          <p>
            Compare the paths visually. Move earlier in the lifecycle when the project still needs more shared context.
          </p>
        </div>
      </div>

      <div class="path-explorer__chooser" role="tablist" aria-label="Workflow paths">
        <For each={props.options}>
          {(option: WorkflowPath) => {
            const selected = () => option.id === activeId();

            return (
              <button
                type="button"
                class="path-explorer__choice"
                classList={{ 'is-active': selected() }}
                role="tab"
                aria-selected={selected()}
                onClick={() => setActiveId(option.id)}
              >
                <span class="path-explorer__choice-label">{option.label}</span>
                <span class="path-explorer__choice-sequence">{option.sequence}</span>
              </button>
            );
          }}
        </For>
      </div>

      <div class="path-explorer__stage">
        <div class="path-explorer__canvas" aria-live="polite">
          <div class="path-explorer__beam path-explorer__beam--one" aria-hidden="true"></div>
          <div class="path-explorer__beam path-explorer__beam--two" aria-hidden="true"></div>
          <div class="path-explorer__flow">
            <For each={activeNodes()}>
              {(node: PathNode, index: Accessor<number>) => (
                <>
                  <article class="path-explorer__node">
                    <p class="path-explorer__node-label">{node.label}</p>
                    <h3>{node.display}</h3>
                    <p>{node.note}</p>
                  </article>
                  {index() < activeNodes().length - 1 ? (
                    <div class="path-explorer__connector" aria-hidden="true">
                      <span></span>
                    </div>
                  ) : null}
                </>
              )}
            </For>
          </div>
        </div>

        <aside class="path-explorer__details">
          <p class="path-explorer__details-kicker">Selected path</p>
          <h3>{activePath()?.label}</h3>
          <p>{activePath()?.description}</p>
          <p class="path-explorer__details-note">{activePath()?.note}</p>
        </aside>
      </div>
    </section>
  );
}
