/*
 ** Description :
 */

import { BaseErr } from './BaseErr.error'

// ---

export class BadReqErr extends BaseErr {
  statusCode = 400

  constructor(public message: string) {
    super(message || 'bad request')

    Object.setPrototypeOf(this, BadReqErr.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }]
  }
}
