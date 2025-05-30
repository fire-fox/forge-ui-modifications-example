import type { HookApi, Field } from '@forge/jira-bridge';

function getFieldData(field: Field<any>) {
  return {
    type: field.getType(),
    name: field.getName(),
    value: field.getValue(),
    optionsVisibility: field.getOptionsVisibility?.(),
    description: field.getDescription(),
    isVisible: field.isVisible(),
    isReadOnly: field.isReadOnly(),
    isRequired: field.isRequired?.(),
  };
}

export function getFieldsSnapshot({ getFields }: HookApi) {
  return getFields().reduce((acc, field) => {
    acc[field.getId()] = getFieldData(field);

    return acc;
  }, {});
}

export function getScreenTabsSnapshot({ getScreenTabs }: HookApi) {
  return getScreenTabs?.().reduce((acc: {}, tab) => {
    acc[tab.getId()] = {
      id: tab.getId(),
      isVisible: tab.isVisible(),
    };

    return acc;
  }, {});
}
