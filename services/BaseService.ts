import { baseURL } from '../lib/domain/url';
import {
  DeleteRequestInterface,
  DeleteRequestInterfaceNamespace,
} from './interfaces/http/deleteRequestInterface';
import {
  GetRequestInterface,
  GetRequestInterfaceNamespace,
} from './interfaces/http/getRequestInterface';
import {
  PostRequestInterface,
  PostRequestInterfaceNamespace,
} from './interfaces/http/postRequestInterace';
import {
  PutRequestInterface,
  PutRequestInterfaceNamespace,
} from './interfaces/http/putRequestInterface';

export class BaseService
  implements
    GetRequestInterface,
    PostRequestInterface,
    PutRequestInterface,
    DeleteRequestInterface
{
  static url: string = `${baseURL}/api`;

  public async GET(
    payload: GetRequestInterfaceNamespace.Request
  ): Promise<GetRequestInterfaceNamespace.Response> {
    const { path } = payload!;
    const res = await fetch(`${BaseService.url + path}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'CSRF-Token': payload?.csrfToken,
      },
    });
    return await res.json();
  }

  public async POST(
    payload: PostRequestInterfaceNamespace.Request
  ): Promise<PostRequestInterfaceNamespace.Response> {
    const { path, body } = payload!;
    const res = await fetch(`${BaseService.url + path}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': payload?.csrfToken,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  public async PUT(
    payload: PutRequestInterfaceNamespace.Request
  ): Promise<PutRequestInterfaceNamespace.Response> {
    const { path, body } = payload!;
    const res = await fetch(`${BaseService.url + path}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': payload?.csrfToken,
      },
      body: JSON.stringify(body),
    });
    if (res.status === 304) return { notModified: true, statusCode: 304 };
    return await res.json();
  }

  public async DELETE(
    payload: DeleteRequestInterfaceNamespace.Request
  ): Promise<DeleteRequestInterfaceNamespace.Response> {
    const { path } = payload!;
    const res = await fetch(`${BaseService.url + path}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'CSRF-Token': payload?.csrfToken,
      },
    });
    return await res.json();
  }
}
