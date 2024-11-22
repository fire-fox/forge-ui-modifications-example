type ViewTypes = 'GIC' | 'IssueView' | 'IssueTransition';

type ExtensionBase<VIEW_TYPE extends ViewTypes> = {
  project: {
    id: string;
    key: string;
    type: string;
  };
  issueType: {
    id: string;
    name: string;
  };
  viewType: VIEW_TYPE;
};

export type UiModificationExtension =
  | ExtensionBase<'GIC'>
  | (ExtensionBase<'IssueView'> & {
      issue: {
        id: string;
        key: string;
      };
    })
  | (ExtensionBase<'IssueTransition'> & {
      issue: {
        id: string;
        key: string;
      };
      issueTransition: {
        id: string;
      };
    });
