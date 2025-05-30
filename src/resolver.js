import api, { APIResponse, route } from '@forge/api';
import {
  UI_MODIFICATIONS_GET,
  UI_MODIFICATIONS_POST,
  UI_MODIFICATIONS_PUT,
  UI_MODIFICATIONS_DELETE,
  UiModificationsEndpoints,
  UiModificationsMethod,
} from './constants';

export const logJson = (content, context = '') => {
  console.log(context, JSON.stringify(content, null, 2));
};

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function uimResolver(endpoint, payload) {
  const params = new URLSearchParams();

  if ('expands' in payload) {
    let expands = [];
    if ('data' in payload.expands) {
      expands.push('data');
    }
    if ('contexts' in payload.expands) {
      expands.push('contexts');
    }

    if (expands.length) {
      params.append('expand', expands.join(','));
    }
  }

  let requestURL;
  const uiModificationId = payload.id;

  if (endpoint === UI_MODIFICATIONS_GET || endpoint === UI_MODIFICATIONS_POST) {
    requestURL = route`/rest/api/3/uiModifications?${params}`;
  }
  if (endpoint === UI_MODIFICATIONS_PUT || endpoint === UI_MODIFICATIONS_DELETE) {
    requestURL = route`/rest/api/3/uiModifications/${uiModificationId}?${params}`;
  }

  console.log('Request URL', requestURL);
  console.log('Method', UiModificationsMethod[endpoint]);

  const request = {
    method: UiModificationsMethod[endpoint],
    headers: {
      ...jsonHeaders,
    },
    body: null,
  };

  if ('body' in payload) {
    request.body = JSON.stringify(payload.body);
  }

  logJson(request.body, 'body');

  const res = await api.asApp().requestJira(requestURL, request);

  const status = res;
  const data = await res.text();

  logJson(status, requestURL);

  return { status, data };
}

export function define(resolver) {
  UiModificationsEndpoints.map((endpoint) => {
    resolver.define(endpoint, async ({ payload }) => {
      return await uimResolver(endpoint, payload);
    });
  });
}
