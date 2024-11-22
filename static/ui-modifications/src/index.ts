import { view } from '@forge/bridge';
import { HookApi, uiModificationsApi } from '@forge/jira-bridge';
import { consoleLogDataSnapshots, consoleLogLastUserChange } from './utils/getSnapshots.ts';
import { UiModificationExtension } from './types.ts';
import { BUG_TEMPLATE, OTHER_TEMPLATE } from './utils/templates.ts';

const log = console.log;
console.log = (...args) => {
  log('UI modifications app,', ...args);
};

// const isIssueTranstion = (extension: UiModificationExtension) => extension.viewType === 'IssueTransition';
// const isIssueView = (extension: UiModificationExtension) => extension.viewType === 'IssueView';
// const isIssueCreate = (extension: UiModificationExtension) => extension.viewType === 'GIC';
// const isBugType = (extension: UiModificationExtension) => extension.issueType.name === 'Bug';

// Context usage
view.getContext().then((context) => {
  const extension = context.extension as UiModificationExtension;
  console.log('Context:');
  console.table(extension);
});

const { onInit, onChange } = uiModificationsApi;

onInit(
  async ({ api, uiModifications }) => {
    consoleLogDataSnapshots(api);
    const { getFieldById, getScreenTabById } = api;

    const extension = (await view.getContext()).extension as UiModificationExtension;

    // ##################
    // TODO 1: Set template for description but only on Issue create
    // Different for Bug and different for other types

    // ##################
    // TODO 2: Make the Quality Assurance tab visibile only when user tries to transtion into "Done" status.
    // Require "change impact" and "quality review" fields to be fulfilled by the user.

    // ##################
    // TODO 3: Limit the amount
    // Limit list of priorities if labels contains "RTB"
    // We want to avoid situation when RTB work is always at the bottom of the backlog
    // Hence, this can help us enforcing the priority for RTB work.
  },
  () => {
    // return ['description', 'customfield_10070', 'customfield_10069', 'priority'];
    return [];
  },
);

onChange(
  ({ api, change }) => {
    const { getFieldById } = api;
    // The `change.current` property provides access to the field which triggered the change
    const { current: currentChange } = change;
    if (!currentChange) {
      return;
    }
    consoleLogLastUserChange(currentChange);

    // ##################
    // TODO 4: Limit list of priorites just after user adds the "RTB" label.
    // Similar logic like in onInit
    // const id = currentChange.getId();
  },
  // () => ['priority'],
  () => [],
);
