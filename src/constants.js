export const UI_MODIFICATIONS_GET = 'GET /rest/api/3/uiModifications';
export const UI_MODIFICATIONS_POST = 'POST /rest/api/3/uiModifications';
export const UI_MODIFICATIONS_PUT = 'PUT /rest/api/3/uiModifications/{uiModificationId}';
export const UI_MODIFICATIONS_DELETE = 'DELETE /rest/api/3/uiModifications/{uiModificationId}';

export const UiModificationsEndpoints = [
  UI_MODIFICATIONS_GET,
  UI_MODIFICATIONS_POST,
  UI_MODIFICATIONS_PUT,
  UI_MODIFICATIONS_DELETE,
];

export const UiModificationsMethod = {
  'GET /rest/api/3/uiModifications': 'GET',
  'POST /rest/api/3/uiModifications': 'POST',

  'PUT /rest/api/3/uiModifications/{uiModificationId}': 'PUT',
  'DELETE /rest/api/3/uiModifications/{uiModificationId}': 'DELETE',
};
