// You can use ADF builder to build your onw template @see https://developer.atlassian.com/cloud/jira/platform/apis/document/playground/
export const BUG_TEMPLATE = {
    version: 1,
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Description',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'In the description section, you must briefly explain what you have done before facing the bug.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Steps to reproduce',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'In this section, you should describe how to reproduce the bug in step by step manner. Easy to follow steps give room to the developers to fix the issue without any chaos.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Expected result',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'What is the expected output from the application when you make an action which causes failure.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Actual result',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'What is the expected output from the application when you make an action which causes failure.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
    ],
} as any;


export const OTHER_TEMPLATE = {
    version: 1,
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Background',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'In the background section, please provied details why this change is needed.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Scope of work',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'In this section, you should describe what is the scop of work, changes that need to be made.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'Resources',
                    marks: [
                        {
                            type: 'strong',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'Provide any usfule resources such as links to get more context for the work.',
                    marks: [
                        {
                            type: 'em',
                        },
                        {
                            type: 'textColor',
                            attrs: {
                                color: '#97a0af',
                            },
                        },
                    ],
                },
            ],
        },
    ],
} as any;
