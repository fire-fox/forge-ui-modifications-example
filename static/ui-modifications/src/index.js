import { view, requestJira } from '@forge/bridge';
import { uiModificationsApi } from '@forge/jira-bridge';
import { getFieldsSnapshot } from './getFieldsSnapshot';

const log = console.log;
console.log = (...args) => {
    log('UI modifications app,', ...args);
};

const isIssueView = (viewType) => viewType === 'IssueView';

// Context usage
view.getContext().then((context) => {
    const { extension } = context;
    console.log('Context:');
    const issue = extension.issue ?? { id: undefined, key: undefined };
    console.table({ project: extension.project, issueType: extension.issueType, issue: issue });
    console.table({ viewType: extension.viewType });
});

const { onInit, onChange } = uiModificationsApi;

const fieldIDs = [];

const toggler = [
    {
        keyword: 'visible',
        getter: 'isVisible',
        setter: 'setVisible',
    },
    // https://developer.atlassian.com/platform/forge/apis-reference/jira-api-bridge/uiModifications/#querying-fields
    // required is not available in issue view
    // {
    //     keyword: 'required',
    //     getter: 'isRequired',
    //     setter: 'setRequired',
    // },
    {
        keyword: 'readonly',
        getter: 'isReadOnly',
        setter: 'setReadOnly',
    },
];

const fieldSetter = ({
    field,
    name,
    description,
    visible,
    value,
    readOnly,
    required,
    optionsVisibility,
}) => {
    if (name) {
        field?.setName(name);
    }
    if (description) {
        field?.setDescription(description);
    }
    if (visible) {
        field?.setVisibility(visible);
    }
    if (value) {
        field?.setValue(value);
    }
    if (readOnly) {
        field?.setReadOnly(readOnly);
    }
    if (required) {
        field?.setRequired(required);
    }
    if (optionsVisibility) {
        field?.setOptionsVisibility(optionsVisibility);
    }
};

const onInitCallback = async ({ api, uiModifications }) => {
    const { getFieldById, getFields } = api;
    const {
        extension: { viewType },
    } = await view.getContext();

    // Generic changes for all fields
    const fields = getFields();
    fields.forEach((field) => {
        try {
            const fieldId = field.getId();
            fieldIDs.push(fieldId);
            field.setName(`[${fieldId}] ${field.getName()} - [${field.getType()}]`);
            field.setDescription(`${field.getDescription()} - UIM`);

            if (
                [
                    'com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes',
                    'com.atlassian.jira.plugin.system.customfieldtypes:multiselect',
                    'com.atlassian.jira.plugin.system.customfieldtypes:select',
                ].includes(field.getType())
            ) {
                // Hide all options
                field.setOptionsVisibility([], true);
            }
        } catch (error) {
            console.error('Error uim-ing:', error);
        }
    });

    // Specific changes, eg changing values of fields should be done here.
    const priority = getFieldById('priority');
    priority?.setValue('3');
    priority?.setOptionsVisibility(['2', '3', '4'], true);

    // Changing the name of description field
    const description = getFieldById('description');
    description?.setName('Modified description name');
    // Changing the value of the description field, only on Issue view
    if (isIssueView(viewType)) {
        description?.setValue({
            version: 1,
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'Modified description value',
                        },
                    ],
                },
            ],
        });
    }

    // NOTE: below are some code examples that you can copy to properly test UIM
    // change people field
    const people = getFieldById('customfield_10104');
    if (isIssueView(viewType)) {
        fieldSetter({
            field: people,
            value: [
                '61953d98f241500072515b30', // Johnson Chau
                '655363:a5b38060-4fc7-4485-a6ee-ef213480027b', // Thanh Tung Dang
            ],
        });
    }

    const approvers = getFieldById('customfield_10152');
    if (isIssueView(viewType)) {
        fieldSetter({
            field: approvers,
            value: [
                '61953d98f241500072515b30', // Johnson Chau
                '655362:80f785b2-4500-485b-84bc-16eb5b513322', // Oliver Wessels
            ],
        });
    }

    // Info

    console.log('Fields Snapshot:');
    console.table(getFieldsSnapshot({ getFields }));

    // Here we read the data that can be set when creating the UI modifications context
    // This is preferred method of making small customizations to adapt your UI modifications to different projects and issue types
    uiModifications.forEach((uiModification) => {
        console.log(`Data for UI modification ID ${uiModification.id}`, uiModification.data);
    });

    toggler.forEach((change) => {
        console.log(
            `You can change the ${change.keyword} property of a field by changing the summary to '${change.keyword} {{fieldId}}' eg '${change.keyword} priority'`,
        );
    });
    console.log(
        "You can also show the options again for single-select, checkbox, and multi-select fields by changing the summary to 'options {{fieldId}}' eg 'options customfield_10190'",
    );

    // Return a Promise to apply changes after resolve.
    return new Promise(async (resolve) => {
        // Example Product API call, lists all the projects before applying the UIM changes
        // const result = await requestJira('/rest/api/3/project');
        // console.log('API call result:', { status: result.status, projects: await result.json() });
        resolve();
    });
};

onInit(onInitCallback, () => {
    // This happens at the same time as onInitCallback so we can't get all the fieldIds from there :(
    const customfield_ids = [];
    for (var i = 10000; i <= 20000; i++) {
        customfield_ids.push(`customfield_${i}`);
    }
    const ids = [
        'summary',
        'description',
        'fixVersions',
        'reporter',
        'labels',
        'assignee',
        'parent',
        'priority',
        ...customfield_ids,
    ];
    return ids;
});

const onChangeCallback = ({ api, change, uiModifications }) => {
    const { getFieldById } = api;
    // The `change.current` property provides access
    // to the field which triggered the change
    const id = change.current.getId();
    const type = change.current.getType();
    const value = change.current.getValue();
    if (typeof value === 'object') {
        console.log(`The ${id} (${type}) field value is: ${JSON.stringify(value)}`);
    } else {
        console.log(`The ${id} (${type}) field value is: ${value}`);
    }

    try {
        if (id === 'summary') {
            const words = value.split(' ');

            toggler.forEach((change) => {
                if (words[0] === change.keyword) {
                    console.log(`Checking if we can toggle ${change.keyword} of ${words[1]} field`);
                    const field = api.getFieldById(words[1]);
                    if (field && field[change.getter]) {
                        const newValue = !field[change.getter]();
                        field[change.setter](newValue);
                        console.log(
                            `Toggling ${change.keyword} of ${words[1]} field to ${newValue}`,
                        );
                    }
                }
            });

            if (words[0] === 'options') {
                const field = api.getFieldById(words[1]);
                if (field) {
                    if (
                        [
                            'com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes',
                            'com.atlassian.jira.plugin.system.customfieldtypes:multiselect',
                            'com.atlassian.jira.plugin.system.customfieldtypes:select',
                        ].includes(field.getType())
                    ) {
                        // Show all options
                        field.setOptionsVisibility([], false);
                        console.log(`Showing all options for ${words[1]} field`);
                    }
                }
            }
        }

        if (id === 'customfield_10104') {
            // change people field
            const people = getFieldById('customfield_10104');
            people?.setValue([
                '61953d98f241500072515b30', // Johnson Chau
                '655363:a5b38060-4fc7-4485-a6ee-ef213480027b', // Thanh Tung Dang
            ]);
        }
    } catch (err) {
        console.error('Error toggling field visibility and required:', err);
    }

    console.table(getFieldsSnapshot({ getFields }));

    const delay = 10;
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Changes applied after ${delay}ms delay`);
            resolve();
        }, delay);
    });
};

onChange(onChangeCallback, () => fieldIDs);
